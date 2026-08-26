export const MOCK_CONTENT = [
  {
    id: 1,
    type: 'article',
    category: 'Frontend',
    title: 'React Server Components Are Changing How We Think About State',
    description: 'A deep dive into RSC architecture, why client/server boundaries matter, and how streaming changes the mental model for React.',
    author: 'jane_dev',
    date: '2026-08-15',
    readTime: '9 min read',
  },
  {
    id: 2,
    type: 'video',
    category: 'DevOps',
    title: 'Kubernetes Networking Explained in 12 Minutes',
    description: 'A visual walkthrough of pods, services, and ingress — the concepts that trip up most beginners.',
    author: 'ops_alex',
    date: '2026-08-12',
    readTime: '12 min',
  },
  {
    id: 3,
    type: 'audio',
    category: 'Data / ML',
    title: 'The State of Vector Databases in 2026',
    description: 'A roundtable discussion on embeddings, retrieval, and what actually matters in production RAG systems.',
    author: 'ml_sam',
    date: '2026-08-10',
    readTime: '34 min',
  },
]

export const MOCK_COMMENTS = {
  default: [
    {
      id: 'c1',
      author: 'devrel_kim',
      time: '2h ago',
      text: 'This finally clicked for me after reading this. The streaming diagram helped a lot.',
      votes: 14,
      replies: [
        {
          id: 'c1-r1',
          author: 'jane_dev',
          time: '1h ago',
          text: "Glad it helped! I'll write a follow-up on Suspense boundaries next.",
          votes: 5,
          replies: [],
        },
      ],
    },
    {
      id: 'c2',
      author: 'backend_paul',
      time: '4h ago',
      text: 'Curious how this compares to islands architecture — any thoughts?',
      votes: 6,
      replies: [],
    },
  ],
}