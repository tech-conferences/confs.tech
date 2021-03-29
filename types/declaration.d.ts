declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

declare module 'react-favicon' {
  export default React.Component
}
