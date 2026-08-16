export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type Contact = {
  email: ContactLink;
  phone: ContactLink;
  github: ContactLink;
  instagram: ContactLink;
  wechat: ContactLink | null;
  linkedin: ContactLink | null;
};

export const contact: Contact = {
  email: {
    label: "Email",
    value: "nancyyu1101@icloud.com",
    href: "mailto:nancyyu1101@icloud.com",
  },
  phone: {
    label: "Phone",
    value: "+86 135 2443 5325",
    href: "tel:+8613524435325",
  },
  github: {
    label: "Github",
    value: "nancyyu-1101",
    href: "https://github.com/nancyyu-1101",
  },
  instagram: {
    label: "Instagram",
    value: "namnamo.0",
    href: "https://www.instagram.com/namnamo.0?igsh=MW12Z2Z2ejlvbGJ6Ng%3D%3D&utm_source=qr",
  },
  wechat: null,
  linkedin: null,
};

