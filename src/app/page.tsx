import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButton } from "./components/auth-button-client";
import { AuthButtonServer } from "./components/auth-button-server";
import { redirect } from "next/navigation";
import PostCard from "./components/post-card";
import { PostList } from "./components/posts-list";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: posts } = await supabase.from("posts").select("*, users(*)");

  console.log(session);
  if (session === null) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[600px] mx-auto border-l border-r border-white/30 min-h-screen">
        <AuthButtonServer />
        <PostList posts={posts} />
      </section>
    </main>
  );
}
