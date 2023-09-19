export interface title {
  display?: boolean;
  text?: string;
}

export interface y {
  title?: title;
  position?: string;
  display?: boolean;
  grid?: { display?: boolean };
  scaleLabel?: {
    display?: true,
    labelString?: string,
  }
}

export interface x {
  grid?: { display?: boolean };
}

export interface scales {
  y: y;
  y1?: y;
  x: x;
}

export interface elements {
  bar?: {
    borderWidth?: number;
  };
}
export interface plugins {
  customCanvasBackgroundColor?: {
    color?: string;
  };
  legend?: { display?: boolean };
  title?: {
    display?: boolean;
    text?: string;
  };
  tooltip?: {
    bodyFont?: {
      weight?: string,
    },
  },
}
export interface options {
  devicePixelRatio: number;
  scales: scales;
  elements?: elements;
  responsive: boolean;
  stacked?: boolean;
  plugins: plugins;
}
