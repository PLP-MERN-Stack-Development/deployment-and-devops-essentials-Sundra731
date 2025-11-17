// Seed script to add sample blog posts
require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const Post = require('./models/Post');
const Category = require('./models/Category');
const User = require('./models/User');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    // Create sample user
    const user = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123',
      role: 'user'
    });

    // Create sample categories
    const techCategory = await Category.create({
      name: 'Technology',
      description: 'Latest technology trends and innovations'
    });

    const webDevCategory = await Category.create({
      name: 'Web Development',
      description: 'Web development tutorials and best practices'
    });

    const mobileCategory = await Category.create({
      name: 'Mobile Development',
      description: 'iOS and Android development guides'
    });

    const aiCategory = await Category.create({
      name: 'Artificial Intelligence',
      description: 'AI, machine learning, and data science'
    });

    const designCategory = await Category.create({
      name: 'Design',
      description: 'UI/UX design principles and tools'
    });

    const careerCategory = await Category.create({
      name: 'Career',
      description: 'Career advice and professional development'
    });

    // Create sample posts
    const samplePosts = [
      {
        title: 'Getting Started with MERN Stack',
        content: 'The MERN stack is a popular full-stack JavaScript framework consisting of MongoDB, Express.js, React.js, and Node.js. This powerful combination allows developers to build robust, scalable web applications using a single programming language throughout the entire stack. In this comprehensive guide, we\'ll walk through setting up your development environment, creating your first MERN application, and deploying it to production.',
        excerpt: 'Learn the basics of the MERN stack and how to get started with your first full-stack JavaScript project.',
        author: user._id,
        category: techCategory._id,
        tags: ['mern', 'javascript', 'full-stack', 'tutorial'],
        isPublished: true
      },
      {
        title: 'Building REST APIs with Express.js',
        content: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. In this detailed tutorial, we\'ll explore how to build RESTful APIs using Express.js with proper error handling, input validation, authentication, and security best practices. You\'ll learn about middleware, routing, and how to structure your API for maintainability.',
        excerpt: 'A comprehensive guide to building secure, scalable REST APIs with Express.js and Node.js.',
        author: user._id,
        category: webDevCategory._id,
        tags: ['express', 'api', 'nodejs', 'rest'],
        isPublished: true
      },
      {
        title: 'React Best Practices for 2024',
        content: 'React has evolved significantly over the years, and with the introduction of hooks, concurrent features, and the new JSX transform, there are many best practices to follow. This post covers essential patterns and practices for writing maintainable React code, including proper state management, component composition, performance optimization, and testing strategies.',
        excerpt: 'Essential React best practices and patterns for modern web development in 2024.',
        author: user._id,
        category: webDevCategory._id,
        tags: ['react', 'frontend', 'best-practices', 'hooks'],
        isPublished: true
      },
      {
        title: 'Flutter vs React Native: Choosing the Right Framework',
        content: 'When it comes to cross-platform mobile development, developers often find themselves choosing between Flutter and React Native. Both frameworks have their strengths and weaknesses, and the choice depends on your project requirements, team expertise, and long-term goals. This comprehensive comparison covers performance, development experience, community support, and real-world use cases.',
        excerpt: 'A detailed comparison of Flutter and React Native to help you choose the right cross-platform framework.',
        author: user._id,
        category: mobileCategory._id,
        tags: ['flutter', 'react-native', 'mobile', 'cross-platform'],
        isPublished: true
      },
      {
        title: 'The Future of Artificial Intelligence in 2024',
        content: 'Artificial Intelligence continues to evolve at a rapid pace, with new breakthroughs in machine learning, natural language processing, and computer vision. From GPT-4 and other large language models to advancements in autonomous systems, AI is transforming industries and creating new opportunities. This post explores the current state of AI technology and what we can expect in the coming years.',
        excerpt: 'Exploring the latest developments and future trends in artificial intelligence and machine learning.',
        author: user._id,
        category: aiCategory._id,
        tags: ['ai', 'machine-learning', 'future-tech', 'gpt'],
        isPublished: true
      },
      {
        title: 'Mastering UI/UX Design Principles',
        content: 'Great user interface and user experience design is crucial for the success of any digital product. Understanding design principles, user psychology, and modern design trends can make the difference between a good product and a great one. This comprehensive guide covers color theory, typography, layout principles, user research methods, and prototyping techniques.',
        excerpt: 'Essential UI/UX design principles and techniques for creating user-centered digital experiences.',
        author: user._id,
        category: designCategory._id,
        tags: ['ui', 'ux', 'design', 'user-experience'],
        isPublished: true
      },
      {
        title: 'From Junior to Senior Developer: A Career Guide',
        content: 'The journey from junior to senior developer is both challenging and rewarding. It requires not just technical skills, but also soft skills like communication, leadership, and problem-solving. This career guide covers the key milestones, skills to develop, mindset shifts, and strategies for advancing your career in software development.',
        excerpt: 'A comprehensive guide to advancing your career from junior to senior software developer.',
        author: user._id,
        category: careerCategory._id,
        tags: ['career', 'senior-developer', 'growth', 'leadership'],
        isPublished: true
      },
      {
        title: 'Building Scalable Node.js Applications',
        content: 'As your Node.js application grows, scalability becomes increasingly important. This guide covers architectural patterns, database optimization, caching strategies, load balancing, and monitoring techniques. Learn how to design applications that can handle thousands of concurrent users while maintaining performance and reliability.',
        excerpt: 'Learn how to build and scale Node.js applications for high traffic and enterprise use cases.',
        author: user._id,
        category: webDevCategory._id,
        tags: ['nodejs', 'scalability', 'performance', 'architecture'],
        isPublished: true
      }
    ];

    // Create posts individually to handle potential duplicates
    for (const postData of samplePosts) {
      try {
        await Post.create(postData);
        console.log(`✅ Created post: ${postData.title}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  Post already exists: ${postData.title}`);
        } else {
          console.error(`❌ Error creating post ${postData.title}:`, error.message);
        }
      }
    }
    console.log('✅ Sample data seeded successfully!');
    console.log(`Created ${samplePosts.length} posts, 6 categories, and 1 user`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();