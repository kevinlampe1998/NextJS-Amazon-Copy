'use client'; 

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { Context } from "@/components/context-provider/component";

export default function Home() {
  const { clientDB, dispatch } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    clientDB.seller && router.push('/frontend/sellers/see-my-products');
  }, []);

  return (
    <div>
      <div>Home</div>
    </div>
  );
}
