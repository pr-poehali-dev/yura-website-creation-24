import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  comments: Comment[];
}

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: 'Современные тренды в веб-дизайне 2024',
      excerpt: 'Изучаем самые актуальные подходы к созданию интерфейсов: от минимализма до смелых градиентов...',
      category: 'Дизайн',
      date: '28 октября 2024',
      readTime: '5 мин',
      comments: [
        { id: 1, author: 'Анна М.', text: 'Отличная статья! Очень актуально', date: '29 окт' }
      ]
    },
    {
      id: 2,
      title: 'Психология цвета в интерфейсах',
      excerpt: 'Как цветовые решения влияют на поведение пользователей и конверсию продуктов...',
      category: 'UX/UI',
      date: '27 октября 2024',
      readTime: '7 мин',
      comments: []
    },
    {
      id: 3,
      title: 'Анимации: когда это уместно',
      excerpt: 'Разбираемся в тонкостях использования микроинтеракций для улучшения пользовательского опыта...',
      category: 'Разработка',
      date: '26 октября 2024',
      readTime: '4 мин',
      comments: [
        { id: 1, author: 'Дмитрий К.', text: 'Полезные примеры!', date: '27 окт' },
        { id: 2, author: 'Елена В.', text: 'Сохранила в закладки', date: '27 окт' }
      ]
    }
  ]);

  const categories = ['Все статьи', 'Дизайн', 'UX/UI', 'Разработка', 'Маркетинг'];
  const [activeCategory, setActiveCategory] = useState('Все статьи');

  const filteredArticles = activeCategory === 'Все статьи' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  const handleAddComment = (articleId: number) => {
    if (!newComment.trim() || !commentAuthor.trim()) return;

    setArticles(articles.map(article => {
      if (article.id === articleId) {
        return {
          ...article,
          comments: [
            ...article.comments,
            {
              id: article.comments.length + 1,
              author: commentAuthor,
              text: newComment,
              date: 'Только что'
            }
          ]
        };
      }
      return article;
    }));

    setNewComment('');
    setCommentAuthor('');
  };

  const currentArticle = articles.find(a => a.id === selectedArticle);

  if (selectedArticle && currentArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedArticle(null)}
            className="mb-6 hover:bg-white/50"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Назад к статьям</span>
          </Button>

          <article className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                {currentArticle.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Icon name="Clock" size={16} />
                {currentArticle.readTime}
              </span>
              <span className="text-sm text-muted-foreground">{currentArticle.date}</span>
            </div>

            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {currentArticle.title}
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg leading-relaxed text-foreground/80">
                {currentArticle.excerpt}
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </article>

          <Card className="shadow-lg border-2 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="MessageCircle" size={24} />
                Комментарии ({currentArticle.comments.length})
              </CardTitle>
              <CardDescription>Поделитесь своим мнением о статье</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mb-6">
                {currentArticle.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-secondary">
                      <AvatarFallback className="text-white font-semibold">
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-foreground/80">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Icon name="Sparkles" size={20} />
                  Добавить комментарий
                </h3>
                <Input
                  placeholder="Ваше имя"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="bg-white border-2"
                />
                <Textarea
                  placeholder="Ваш комментарий..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-white border-2 min-h-[100px]"
                />
                <Button
                  onClick={() => handleAddComment(currentArticle.id)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
                  size="lg"
                >
                  <Icon name="Send" size={18} />
                  <span className="ml-2">Отправить</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Блог
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Статьи о дизайне, разработке и современных трендах
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-scale-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg scale-105'
                  : 'hover:scale-105 hover:border-primary'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <Card
              key={article.id}
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedArticle(article.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                    {article.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {article.readTime}
                  </span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-xl">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-base">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={16} />
                    <span>{article.comments.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
