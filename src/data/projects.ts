export interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    image: string;
    size: 'large' | 'medium' | 'small';
}

export const projects: Project[] = [
    {
        id: 'horizon-house',
        title: 'The Horizon House',
        subtitle: 'Cliffside Living',
        category: 'Residential',
        year: '2024',
        image: '/images/projects/horizon-house.jpg',
        size: 'large',
    },
    {
        id: 'azure-villa',
        title: 'Azure Villa',
        subtitle: 'Mediterranean Escape',
        category: 'Residential',
        year: '2024',
        image: '/images/projects/azure-villa.jpg',
        size: 'medium',
    },
    {
        id: 'urban-loft',
        title: 'Urban Loft',
        subtitle: 'City Sophistication',
        category: 'Commercial',
        year: '2023',
        image: '/images/projects/urban-loft.jpg',
        size: 'medium',
    },
    {
        id: 'glass-pavilion',
        title: 'Glass Pavilion',
        subtitle: 'Transparent Living',
        category: 'Residential',
        year: '2023',
        image: '/images/projects/glass-pavilion.jpg',
        size: 'small',
    },
    {
        id: 'terra-house',
        title: 'Terra House',
        subtitle: 'Earth & Stone',
        category: 'Residential',
        year: '2023',
        image: '/images/projects/terra-house.jpg',
        size: 'small',
    },
    {
        id: 'sky-residence',
        title: 'Sky Residence',
        subtitle: 'Penthouse Living',
        category: 'Residential',
        year: '2022',
        image: '/images/projects/sky-residence.jpg',
        size: 'small',
    },
];
