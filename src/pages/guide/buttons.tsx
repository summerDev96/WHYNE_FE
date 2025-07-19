import { Button } from "@/components/ui/button";

export default function buttons() {
  return (
    <div>
      <div style={{ width: "1000px", marginLeft: "20px" }}>
        Size
        <div style={{ marginBottom: "10px" }}>
          <Button size="xs" width="xs">
            xs
          </Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button size="sm" width="sm">
            sm
          </Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button size="md" width="md">
            md
          </Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button size="lg" width="lg">
            lg
          </Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button size="xl" width="xl">
            xl
          </Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button size="onlyLanding" width="onlyLanding">
            onlyLanding
          </Button>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: "800px", marginBottom: "10px" }}>
        <Button width="full">full</Button>
      </div>
      <div style={{ marginLeft: "20px" }}>Variant</div>
      <div
        style={{
          width: "500px",
          marginLeft: "20px",
          display: "flex",
          gap: "20px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <Button variant="white">white</Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button variant="purpleDark">purpleDark</Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button variant="purpleLight">purpleLight</Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Button variant="onlyCancel">onlyCancel</Button>
        </div>
      </div>
      <div style={{ marginLeft: "20px" }}>fontSize</div>
      <div style={{ marginLeft: "20px" }}>fontWeight</div>
    </div>
  );
}
