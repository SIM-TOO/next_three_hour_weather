import React from 'react'
import styles from './LoadingSpinner.module.css'

interface loadingSpinnerProps {
  width?: string;
  height?: string;
}

const LoadingSpinner = ({ width, height }: loadingSpinnerProps) => {
  return (
    <div
      className={`${width ?? 'w-[48px]'} ${height ?? 'h-[48px]'} ${styles.loader}`}
    />
  )
}

export default LoadingSpinner