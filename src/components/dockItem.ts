import React from 'react';
import LinkedInIcon from '../icons/linkedin.astro';
import TwitterIcon from '../icons/twitter.astro';
import GitHubIcon from '../icons/github.astro';

export const items = [
  {
    icon: <LinkedInIcon width={20} height={20} />,
    label: 'LinkedIn',
    onclick: () => window.open('https://www.linkedin.com/in/tu-perfil', '_blank'),
  },
  {
    icon: <TwitterIcon width={20} height={20} />,
    label: 'Twitter',
    onClick: () => window.open('https://twitter.com/tu-usuario', '_blank')
  },
  {
    icon: <GitHubIcon width={20} height={20} />,
    label: 'GitHub',
    onClick: () => window.open('https://github.com/tu-usuario', '_blank')
  },
];