"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/auth-schema";
import { signIn } from "@/resources/auth/service/auth.service";

type FieldErrors = { identifier?: string; password?: string };

export function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const parsed = signInSchema.safeParse({ identifier, password });
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if ((field === "identifier" || field === "password") && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const session = await signIn(parsed.data);
      const firstReadableModule = session.user.permissions.find((permission) => permission.endsWith(".read"))?.replace(/\.read$/, "");
      const landingPage = session.user.roles.includes("admin")
        ? "/admin/users"
        : firstReadableModule ? `/admin/${firstReadableModule}` : "/dashboard";
      router.replace(landingPage);
      router.refresh();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "We couldn’t sign you in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f6fa] px-4 py-8 text-[#172235] sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-44 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(95,117,255,0.15),rgba(95,117,255,0)_68%)]" />
        <div className="absolute -bottom-72 -right-24 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(43,149,206,0.14),rgba(43,149,206,0)_70%)]" />
        <div className="absolute inset-0 opacity-[0.25] [background-image:linear-gradient(rgba(117,132,162,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(117,132,162,0.12)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_76%)]" />
      </div>

      <div className="grid w-full max-w-[1080px] items-center gap-10 lg:grid-cols-[1fr_454px] lg:gap-20">
        <section className="hidden max-w-[500px] lg:block">
          <div className="mb-12 flex items-center gap-4">
            <div className="grid size-[68px] place-items-center rounded-2xl border border-white/80 bg-white/85 p-2 shadow-[0_12px_34px_-18px_rgba(18,44,89,0.35)] backdrop-blur">
              <Image src="/fst.png" alt="FST logo" width={56} height={56} className="size-12 object-contain" priority />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#64728b]">American International University-Bangladesh</p>
              <p className="mt-1 text-sm font-semibold text-[#1d2d48]">Faculty of Science &amp; Technology</p>
            </div>
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dce4f1] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#475a79] shadow-sm">
            <Sparkles className="size-3.5 text-[#4267d5]" />
            Faculty workspace
          </div>
          <h1 className="max-w-[470px] text-[42px] font-semibold leading-[1.14] tracking-[-0.045em] text-[#172235] xl:text-[50px]">
            Your academic work, <span className="text-[#4b62c6]">all in one place.</span>
          </h1>
          <p className="mt-5 max-w-[420px] text-[15px] leading-7 text-[#68758b]">
            Sign in to access the Faculty of Science &amp; Technology workspace for courses, sections, and academic tasks.
          </p>

          <div className="relative mt-12 h-[154px] max-w-[425px] overflow-hidden rounded-[26px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(239,243,255,0.78))] p-5 shadow-[0_28px_70px_-48px_rgba(39,65,122,0.42)]">
            <div aria-hidden="true" className="absolute -right-9 -top-16 size-48 rounded-full border border-[#d9e1f4]" />
            <div aria-hidden="true" className="absolute -right-1 -top-8 size-32 rounded-full border border-[#d9e1f4]" />
            <div aria-hidden="true" className="absolute -bottom-20 right-24 size-36 rounded-full bg-[#e1e8ff]/80 blur-2xl" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-[#edf1ff] text-[#5369c5]">
                <Fingerprint className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#25334b]">One secure sign-in</p>
                <p className="mt-1 text-xs leading-5 text-[#7a879d]">Use your registered university account to continue.</p>
              </div>
            </div>
          </div>
          <p className="mt-10 text-xs text-[#8994a7]">AIUB · Faculty of Science &amp; Technology</p>
        </section>

        <section className="mx-auto w-full max-w-[454px]">
          <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
            <div className="grid size-12 place-items-center rounded-xl border border-white bg-white p-1 shadow-sm">
              <Image src="/fst.png" alt="FST logo" width={44} height={44} className="size-10 object-contain" priority />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#68758b]">AIUB</p>
              <p className="text-sm font-semibold text-[#24344f]">Faculty of Science &amp; Technology</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/90 bg-white/90 p-7 shadow-[0_30px_90px_-42px_rgba(31,48,83,0.3)] backdrop-blur-xl sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#233450]">
                <span className="grid size-8 place-items-center rounded-lg bg-[#edf1ff] text-[#4f65c8]"><KeyRound className="size-4" /></span>
                FST Portal
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f7f4] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#4c8063]">
                <ShieldCheck className="size-3.5" /> SECURE ACCESS
              </span>
            </div>

            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7887a0]">Welcome back</p>
              <h2 className="text-[32px] font-semibold tracking-[-0.04em] text-[#182338]">Sign in to your account</h2>
              <p className="mt-2 text-sm leading-6 text-[#778399]">Use your university email or employee ID to continue.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="identifier" className="mb-2 block text-[13px] font-medium text-[#33425a]">Email or employee ID</label>
                <div className={`flex h-[50px] items-center gap-3 rounded-xl border bg-white px-3.5 transition focus-within:border-[#8696e7] focus-within:ring-4 focus-within:ring-[#6577d2]/10 ${errors.identifier ? "border-rose-300" : "border-[#e1e6ef]"}`}>
                  <Fingerprint aria-hidden="true" className="size-[17px] shrink-0 text-[#8995aa]" />
                  <input
                    id="identifier"
                    name="identifier"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={identifier}
                    onChange={(event) => { setIdentifier(event.target.value); setErrors((current) => ({ ...current, identifier: undefined })); setFormError(""); }}
                    placeholder="name@aiub.edu or employee ID"
                    aria-invalid={Boolean(errors.identifier)}
                    aria-describedby={errors.identifier ? "identifier-error" : undefined}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#25334b] outline-none placeholder:text-[#a0aaba]"
                  />
                </div>
                {errors.identifier && <p id="identifier-error" role="alert" className="mt-1.5 text-xs text-rose-600">{errors.identifier}</p>}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-[#33425a]">Password</label>
                <div className={`flex h-[50px] items-center gap-3 rounded-xl border bg-white px-3.5 transition focus-within:border-[#8696e7] focus-within:ring-4 focus-within:ring-[#6577d2]/10 ${errors.password ? "border-rose-300" : "border-[#e1e6ef]"}`}>
                  <KeyRound aria-hidden="true" className="size-[17px] shrink-0 text-[#8995aa]" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined })); setFormError(""); }}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#25334b] outline-none placeholder:text-[#a0aaba]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="grid size-8 shrink-0 place-items-center rounded-lg text-[#8995aa] transition hover:bg-[#f3f5fa] hover:text-[#3a4d6d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6577d2]"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && <p id="password-error" role="alert" className="mt-1.5 text-xs text-rose-600">{errors.password}</p>}
              </div>

              {formError && (
                <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-[13px] leading-5 text-rose-700">
                  <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-rose-500" />
                  <span>{formError}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 h-[50px] w-full rounded-xl bg-[#253451] text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(27,43,74,0.8)] hover:bg-[#314467] focus-visible:ring-[#6a7bd2]"
              >
                {isSubmitting ? <><LoaderCircle className="size-4 animate-spin" /> Signing in...</> : <>Sign in <ArrowRight className="size-4" /></>}
              </Button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#edf0f5] pt-5 text-xs text-[#8792a5]">
              <ShieldCheck className="size-3.5 text-[#77917f]" />
              Your session is protected and encrypted.
            </div>
          </div>
          <p className="mt-5 text-center text-[11px] text-[#8994a7] lg:hidden">AIUB · Faculty of Science &amp; Technology</p>
        </section>
      </div>
    </main>
  );
}
