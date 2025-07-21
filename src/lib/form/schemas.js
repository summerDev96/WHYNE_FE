import z from "zod";
export const emailSchema = z
  .string()
  .min(1, "이메일은 필수 입력입니다.")
  .refine(
    (val) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(val);
    },
    {
      message: "이메일 형식으로 작성해 주세요.",
    }
  );

export const nicknameSchema = z
  .string()
  .min(1, "닉네임은 필수 입력입니다.")
  .max(20, "닉네임은 최대 20자까지 가능합니다.");

export const passwordSchema = z
  .string()
  .min(1, "비밀번호는 필수 입력입니다.")
  .min(8, "비밀번호는 최소 8자 이상입니다.")
  .refine(
    (val) => {
      // 이메일 정규식 직접 검사
      const passwordRegex = /^[A-Za-z0-9!@#$%^&*]+$/;
      return passwordRegex.test(val);
    },
    {
      message: "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
    }
  );

export const passwordCheckSchema = z
  .string()
  .min(1, "비밀번호 확인을 입력해주세요")
  .min(8, "비밀번호 확인을 8자 이상 입력해주세요");
