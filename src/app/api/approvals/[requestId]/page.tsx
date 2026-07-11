"use client";

import { useParams, useRouter } from "next/navigation";

export default function ApprovalPage() {
  const params = useParams();
  const router = useRouter();

  const requestId = Number(params.requestId);

  if (!requestId) {
    return <p>Invalid Request ID</p>;
  }

  async function approve() {
    await fetch("/api/approvals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId,
        approvedById: 1,
        status: "APPROVED",
      }),
    });

    router.push("/asset-requests");
  }

  async function reject() {
    await fetch("/api/approvals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId,
        approvedById: 1,
        status: "REJECTED",
      }),
    });

    router.push("/asset-requests");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Approval Page</h1>
      <p>Request ID: {requestId}</p>

      <button onClick={approve}>Approve</button>
      <button onClick={reject}>Reject</button>
    </div>
  );
}