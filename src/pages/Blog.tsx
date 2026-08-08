import { useQuery } from '@tanstack/react-query'
import { getBlogPosts } from '../api'
import '../styles/pages.css'

export default function Blog() {
  const { data: blog, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlogPosts })

  if (isLoading) return <div className="page"><p>Chargement...</p></div>

  return (
    <div className="page">
      <h1>Actualités</h1>
      <div className="blog-grid">
        {blog?.data?.map((post: any) => (
          <article key={post.id} className="blog-card">
            {post.featuredImage && <img src={post.featuredImage} alt={post.title} />}
            <h2>{post.title}</h2>
            {post.excerpt && <p>{post.excerpt}</p>}
            <p className="date">{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</p>
            <a href={`/blog/${post.id}`}>Lire plus →</a>
          </article>
        ))}
      </div>
    </div>
  )
}
