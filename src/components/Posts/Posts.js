import { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_WP_API_URL || 'http://cms.local';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // _embed adds the featured image (and author, terms) to each post
        const response = await fetch(`${API_URL}/wp-json/wp/v2/posts?_embed`);

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        	setPosts(data);
      } catch (error) {
       		 console.error(error);
      } finally {
        		setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="p-8 text-center text-gray-500">Loading posts...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const media = post._embedded?.['wp:featuredmedia']?.[0];
          const image = media?.source_url;

          return (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {image ? (
                <img
                  src={image}
                  alt={media.alt_text || ''}
                  className="h-52 w-full object-cover"
                />
              ) : (
                <div className="flex h-52 w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                  No image
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <h2
                  className="mb-3 text-xl font-semibold text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div
                  className="line-clamp-4 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
