"use server";
import { revalidatePath } from "next/cache";
import { db } from ".";
import { blogPosts } from "./schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const getAllPost = async () => {
  const post = await db.query.blogPosts.findMany();

  if (!post || post.length === 0) {
    return { error: "No posts found" };
  }
  return { success: post };
};

export const createPost: (formData: FormData) => Promise<void> = async (
  formData
) => {
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!title || !content) {
    console.log("No title found");
    return;
  }
  await db.insert(blogPosts).values({ title, content });
  revalidatePath("/");
  redirect("/");
};

export const deletePost: (formData: FormData) => Promise<void> = async (
  formData
) => {
  const id = Number(formData.get("id"));

  if (!id) {
    console.error("No ID found for deletion");
    return;
  }

  await db.delete(blogPosts).where(eq(blogPosts.id, Number(id)));
  revalidatePath("/");
  redirect("/");
};

export const getPostById = async (id: number) => {
  if (isNaN(id)) {
    return { error: "Invalid post ID" };
  }
  const post = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, id),
  });

  if (!post) {
    return { error: "Post not found" };
  }
  return { success: post };
};

export const updateData: (formData: FormData) => Promise<void> = async (formData) => {
    const id = Number(formData.get("id"));
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    if (!id) {
        console.error("No ID found for update");
        return;
    }

    if (!title || !content) {
        console.log("Nothing to update");
        return;
    }
    
    // await db.update(blogPosts).set({ title, content }).where(eq(blogPosts.id, id))
    await db.update(blogPosts).set({ title, content }).where(eq(blogPosts.id, id))
    revalidatePath(`/blog/${id}`)
    redirect(`/blog/${id}`)
    

}