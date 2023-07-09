import Link from 'next/link';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface MyComponentProps {
  // Define the properties and their types here
  icon: string;
  children: ReactNode;
}

export default function NavItem(props: MyComponentProps) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}