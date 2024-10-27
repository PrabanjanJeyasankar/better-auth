import spinnerStyles from './SpinnerLoaderComponent.module.css'

function SpinnerLoaderComponent() {
    return (
        <div className={spinnerStyles.spinner}>
            <div className={spinnerStyles.bar1} />
            <div className={spinnerStyles.bar2} />
            <div className={spinnerStyles.bar3} />
            <div className={spinnerStyles.bar4} />
            <div className={spinnerStyles.bar5} />
            <div className={spinnerStyles.bar6} />
            <div className={spinnerStyles.bar7} />
            <div className={spinnerStyles.bar8} />
            <div className={spinnerStyles.bar9} />
            <div className={spinnerStyles.bar10} />
            <div className={spinnerStyles.bar11} />
            <div className={spinnerStyles.bar12} />
        </div>
    )
}

export default SpinnerLoaderComponent
