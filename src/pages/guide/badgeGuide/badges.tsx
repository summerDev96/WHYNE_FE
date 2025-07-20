import { Badge } from "@/components/ui/badge";

export default function badges() {
  return (
    <div>
      <input
        type="radio"
        id="mail"
        name="contact"
        value="mail"
        className="peer hidden" // 숨기되 상태 감지는 유지
      />
      <label htmlFor="mail">
        <Badge>우편</Badge>
      </label>
      <button type="submit">제출</button>
      <Badge variant="chooseWineType">레드와인</Badge>
      <Badge variant="priceBadge">2000원</Badge>
      <Badge variant="flavor">향12</Badge>
      <Badge variant="star">☆ ★</Badge>
    </div>
  );
}
