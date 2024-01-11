import React from "react";

export default function UserDetail({ params }: { params: { id: string } }) {
  return <div>Ini user : {params.id}</div>;
}
