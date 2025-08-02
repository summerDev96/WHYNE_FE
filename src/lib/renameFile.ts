/**
 * 파일 이름을 안전하고 일관된 형식으로 변환합니다.
 * - 한글, 공백, 특수문자 제거
 * - 확장자 유지
 * - 중복 방지를 위해 옵션에 따라 타임스탬프 추가
 * - 확장자가 없는 경우도 안전하게 처리
 *
 * @param originalName 원본 파일 이름
 * @param useTimestamp 중복 방지를 위해 타임스탬프 추가 여부 (기본값: true)
 * @returns 변환된 파일 이름
 */
export function sanitizeFileName(originalName: string, useTimestamp: boolean = true): string {
  const extension = originalName.includes('.')
    ? originalName.substring(originalName.lastIndexOf('.'))
    : '';

  const baseName = originalName.includes('.')
    ? originalName.substring(0, originalName.lastIndexOf('.'))
    : originalName;

  const cleanedBase = baseName
    .replace(/[^\w\d_-]/g, '') // 특수문자, 한글, 공백 제거
    .toLowerCase()
    .slice(0, 50); // 너무 긴 파일명 방지

  const timestamp = Date.now();

  return `${cleanedBase || 'file'}${useTimestamp ? `_${timestamp}` : ''}${extension}`;
}

/**
 * File 객체의 이름이 안전하지 않다면, 조건부로 새 이름을 생성하여 새 File 객체 반환
 *
 * @param file 원본 File 객체
 * @returns 이름이 변경된 새 File 객체 (필요 시)
 */
export function renameFileIfNeeded(file: File): File {
  const safeNameWithoutTimestamp = sanitizeFileName(file.name, false);
  if (file.name === safeNameWithoutTimestamp) return file;

  const newName = sanitizeFileName(file.name, true);
  return new File([file], newName, { type: file.type });
}
