import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE_URL } from "../content/runtimeConfig";
import styles from "../styles/home.module.css";
import "../styles/cohesion.css";

type SiteShellProps = {
  children: ReactNode;
};

const primaryNav = [
  { label: "Forge Suite", to: