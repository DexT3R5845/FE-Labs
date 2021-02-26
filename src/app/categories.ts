export interface ICategories {
  name: string;
  icon: string;
  showSubCategories: boolean;
  subCategories: string[];
}

export const CATEGORIES: ICategories[] = [
  {
    name: 'Programming',
    icon: '../assets/images/categories/programming.png',
    showSubCategories: false,
    subCategories: [
      'JavaScript',
      'Java',
      'Python',
      'SQL',
      'Data structure & Algorithms',
      'Architecture',
      'Design Patterns',
      'Networks',
      'Information Systems',
      'Operating systems',
    ],
  },
];
