
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Filter, Clock, ArrowRight, Heart, Brain, Baby, ThermometerSnowflake, Activity } from "lucide-react";

interface ResourceArticle {
  id: string;
  title: string;
  description: string;
  category: "menopause" | "mentalhealth" | "pregnancy" | "general" | "wellness";
  readTime: number;
  imageSrc: string;
  featured?: boolean;
}

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const articles: ResourceArticle[] = [
    {
      id: "1",
      title: "Understanding Perimenopause: Early Signs and Symptoms",
      description: "Learn about the early warning signs of perimenopause and how to manage the transition.",
      category: "menopause",
      readTime: 8,
      imageSrc: "/placeholder.svg",
      featured: true
    },
    {
      id: "2",
      title: "The Connection Between Hormones and Mental Health",
      description: "Explore how hormonal changes throughout your life can impact your mental wellbeing.",
      category: "mentalhealth",
      readTime: 12,
      imageSrc: "/placeholder.svg",
    },
    {
      id: "3",
      title: "Nutrition During Pregnancy: Trimester by Trimester",
      description: "A comprehensive guide to nutrition needs during each stage of pregnancy.",
      category: "pregnancy",
      readTime: 15,
      imageSrc: "/placeholder.svg",
    },
    {
      id: "4",
      title: "Hot Flash Management Strategies That Actually Work",
      description: "Evidence-based approaches to managing hot flashes during menopause.",
      category: "menopause",
      readTime: 7,
      imageSrc: "/placeholder.svg",
    },
    {
      id: "5",
      title: "Building a Sustainable Self-Care Routine",
      description: "How to create and maintain a self-care practice that fits your lifestyle.",
      category: "wellness",
      readTime: 5,
      imageSrc: "/placeholder.svg",
      featured: true
    },
    {
      id: "6",
      title: "Understanding Your Menstrual Cycle's Four Phases",
      description: "A detailed look at each phase of your cycle and how it affects your body and mind.",
      category: "general",
      readTime: 10,
      imageSrc: "/placeholder.svg",
    },
    {
      id: "7",
      title: "Hormone Replacement Therapy: Benefits and Risks",
      description: "The latest research on HRT to help you make an informed decision with your healthcare provider.",
      category: "menopause",
      readTime: 14,
      imageSrc: "/placeholder.svg",
    },
    {
      id: "8",
      title: "Mindfulness Practices for Anxiety Relief",
      description: "Simple mindfulness techniques you can practice daily to reduce anxiety.",
      category: "mentalhealth",
      readTime: 6,
      imageSrc: "/placeholder.svg",
    }
  ];
  
  const filterArticles = () => {
    return articles.filter(article => {
      // Filter by search query
      const matchesQuery = searchQuery === "" || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = activeCategory === "all" || article.category === activeCategory;
      
      return matchesQuery && matchesCategory;
    });
  };
  
  const featuredArticles = articles.filter(article => article.featured);
  const filteredArticles = filterArticles();
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "menopause":
        return <ThermometerSnowflake className="h-4 w-4" />;
      case "mentalhealth":
        return <Brain className="h-4 w-4" />;
      case "pregnancy":
        return <Baby className="h-4 w-4" />;
      case "wellness":
        return <Activity className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout>
      <div className="py-8 bg-gradient-to-b from-herhealth-pink-light/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <BookOpen className="mr-2" />
              Health Resources
            </h1>
            <p className="text-gray-600">Evidence-based articles and resources for every stage of your health journey</p>
          </div>
          
          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 h-48">
                      <img 
                        src={article.imageSrc} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        {getCategoryIcon(article.category)}
                        <span className="ml-1 capitalize">{article.category}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4" />
                        <span className="ml-1">{article.readTime} min read</span>
                      </div>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="ghost" className="text-herhealth-pink-dark hover:text-herhealth-pink flex items-center">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-500" size={18} />
                <span className="text-sm font-medium">Filter:</span>
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="menopause">Menopause</TabsTrigger>
                    <TabsTrigger value="mentalhealth">Mental Health</TabsTrigger>
                    <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
                    <TabsTrigger value="wellness">Wellness</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      {getCategoryIcon(article.category)}
                      <span className="ml-1 capitalize">{article.category}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4" />
                      <span className="ml-1">{article.readTime} min read</span>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {article.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-herhealth-pink-dark hover:text-herhealth-pink flex items-center p-0">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No resources found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// Helper component for displaying no results
const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Search size={48} strokeWidth={1.5} className="opacity-50" />
    </div>
  );
};

export default ResourcesPage;
