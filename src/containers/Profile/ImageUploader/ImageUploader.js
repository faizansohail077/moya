import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import './ImageUploader.css'
import { BsUpload } from 'react-icons/bs'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { ImDroplet } from 'react-icons/im';

export function ImageUploader({ getFIle, image }) {

    const [images, setImages] = useState();
    const Logo = <ImDroplet size={90} color={"var(--bg)"} />
    const maxNumber = 69;

    const onChange = (imageList) => {
        setImages(imageList[0]?.data_url);
    };


    return (
        <div>
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    onImageUpload,
                    onImageRemoveAll,
                }) => (
                    <div className="upload__image-wrapper">
                        <span>
                            {
                                images ?
                                    <div style={{ cursor: 'pointer' }} >
                                        <div className="upload__image-cross">
                                            <AiFillCloseCircle onClick={onImageRemoveAll} />
                                        </div>
                                        <div className="upload__image">
                                            <img width="150px" height="150px" src={images} alt='' />
                                        </div>
                                    </div>
                                    :
                                    <div className="upload__imagediv1" style={{ cursor: 'pointer' }} onClick={onImageUpload}>
                                        <div className="upload__image">
                                            <div className="upload__image-edit">
                                                <AiFillEdit onClick={onImageUpload} />
                                            </div>
                                            <BsUpload className="uploader" style={{ fontSize: '40px' }} />
                                            {Logo}
                                        </div>
                                    </div>
                            }
                        </span>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
