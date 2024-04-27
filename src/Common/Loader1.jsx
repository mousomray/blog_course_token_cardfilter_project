import React from 'react'
import { FidgetSpinner } from 'react-loader-spinner';

const Loader1 = () => {
    return (
        <>
            <FidgetSpinner
                visible={true}
                height="150"
                width="150"
                ariaLabel="fidget-spinner-loading"
                wrapperStyle={{}}
                wrapperClass="fidget-spinner-wrapper"
            />

        </>
    )
}

export default Loader1