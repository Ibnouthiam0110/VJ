import { useQuery } from '@tanstack/react-query'
import { getBlogPosts } from '../api'
import { useTranslation } from 'react-i18next'
import '../styles/pages.css'

export default function Blog() {
  const { t } = useTranslation()
  const { data: blog, isLoading } = useQuery({ queryKey: ['blog'], queryFn: getBlogPosts })

  if (isLoading) return <div className="page"><p>{t('common.loading')}</p></div>

  return (
    <div className="page">
      <h1>{t('blog_section.title')}</h1>
      <div className="blog-grid">
        {blog?.data?.map((post: any) => (
          <article key={post.id} className="blog-card">
            {post.featuredImage && <img src={post.featuredImage} alt={post.title} />}
            <h2>{post.title}</h2>
            {post.excerpt && <p>{post.excerpt}</p>}
            <p className="date">{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</p>
            <a href={`/blog/${post.id}`}>{t('news.read_article')} →</a>
          </article>
        ))}
      </div>
    </div>
  )
}
