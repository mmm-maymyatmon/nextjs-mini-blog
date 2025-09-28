import Button from "@/components/Button";
import { getPostById, updateData } from "@/server/action";
import Link from "next/link";
import React from "react";

type EditPostPageProps = {
  params: Promise<{ id: string }> ;
};

const EditPostPage = async (props: EditPostPageProps) => {
  const params = await props.params;
   const { success, error } = await getPostById(Number(params.id));

  

  if (error) {
    return (
      <p className="text-red-500 text-center mt-6 text-lg font-medium">
        Error: {error}
      </p>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          ✏️ Edit Blog Post
        </h1>

        <form action={updateData} className="flex flex-col gap-6">
          <input type="hidden" name="id" value={params.id} readOnly />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            
            <input
              type="text"
              name="title"
              defaultValue={success?.title}
              placeholder="Enter your post title"
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition px-4 py-2"
                required
              />
              </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            
            <textarea
              name="content"
              defaultValue={success?.content}
              placeholder="Write your content here..."
              rows={6}
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition px-4 py-2"
                required
            ></textarea>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/blog">
              <Button
                variant="secondary"
                label="Cancel"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              />
            </Link>
            <Button variant="primary" label="Update Post" className="px-6" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
