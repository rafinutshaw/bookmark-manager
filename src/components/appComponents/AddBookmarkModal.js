import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppHelper from '../../helpers/app.helper';
import { validateURL } from '../../helpers/validators';
import Modal from '../sharedComponents/Modal';

function AddBookmarkModal({
    showModal,
    handleClose = () => { },
    modalTitle = 'Add Bookmark',
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [createCategory, setCreateCategory] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const onSubmit = (data) => {
        debugger
        console.log(data);
        if (createCategory || categoryList.items.length == 0) {
            data.categoryName = data.newCategoryName
        }
        closeModal({ data, result: true });
    };
    const closeModal = (data) => {
        handleClose(data);
        setCreateCategory(false)
        reset();
    };
    console.log(errors)
    const [categoryList, setCategoryList] = useState({ items: [], isReady: false })
    const validationSchema = {
        required: { required: '*Required.' },
        url: { required: 'Required.', pattern: validateURL },

    }

    useEffect(() => {
        setCategoryList({ items: AppHelper.getCategoryList(), isReady: true })
    }, [])
    console.log(createCategory)
    const newCategoryUI = () => {
        return <div className="mt-2">

            <input
                {...register(
                    'newCategoryName',
                    (createCategory || categoryList.items.length == 0) ? validationSchema.required : {}
                )}
                className={`form-field ${errors.bookmark?.newCategoryName
                    ? 'border-red-400'
                    : ''
                    }`}
                placeholder="Enter Category Name"
                id="newCategoryName"
            />
            {errors.newCategoryName && (
                <p className="ml-3 text-red-500 text-xs italic">
                    {errors.newCategoryName.message}
                </p>
            )}
        </div>
    }

    return (
        <Modal
            title={modalTitle}
            isOpen={showModal}
            handleClose={() => closeModal({ result: false })}
        >
            <div className="flex flex-col">
                {categoryList.isReady ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="-mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="font-xs " htmlFor="title">
                                    Title
                                </label>
                                <div className="relative">
                                    <input
                                        {...register(
                                            'bookmark.title',
                                            validationSchema.required
                                        )}
                                        className={`form-field ${errors.bookmark?.title
                                            ? 'border-red-400'
                                            : ''
                                            }`}
                                        placeholder="Enter Title"
                                        id="title"
                                    />
                                </div>
                                {errors.bookmark?.title && (
                                    <p className="ml-3 text-red-500 text-xs italic">
                                        {errors.bookmark.title.message}
                                    </p>
                                )}
                            </div>
                            <div className='className="w-full px-3 mb-6 md:mb-0"'>
                                <label className="font-xs " htmlFor="bookmarkUrl">
                                    Url
                                </label>
                                <div className="relative">
                                    <input
                                        {...register(
                                            'bookmark.bookmarkUrl',
                                            validationSchema.url
                                        )}
                                        className={`form-field ${errors.bookmark?.bookmarkUrl
                                            ? 'border-red-400'
                                            : ''
                                            }`}
                                        placeholder="Enter Url"
                                        id="bookmarkUrl"
                                    />
                                </div>
                                {errors.bookmark?.bookmarkUrl && (
                                    <p className="ml-3 text-red-500 text-xs italic">
                                        {errors.bookmark.bookmarkUrl.message}
                                    </p>
                                )}
                            </div>
                            <div className='className="w-full px-3 "'>
                                <label htmlFor="category">Category</label>
                            </div>

                            {categoryList.items?.length != 0 &&
                                <div className='w-full px-3 mb-6 md:mb-0 flex'>
                                    <div className='flex-grow mr-2'>
                                        <select
                                            disabled={createCategory}
                                            name="category"
                                            id="category"
                                            className="form-field"
                                            {...register('categoryName', createCategory ? {} : validationSchema.required)}
                                        >
                                            {categoryList.items.map((item, index) => (
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>

                                        {categoryList.items?.length != 0 && errors.categoryName && (
                                            <p className="ml-3 text-red-500 text-xs italic">
                                                {errors.categoryName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className='flex'>
                                        <button className='btn btn-rounded' onClick={() => setCreateCategory(true)}>+</button>
                                    </div>
                                </div>
                            }
                            {(createCategory || categoryList.items?.length == 0) && <div className='className="w-full px-3 mb-6 md:mb-0"'>
                                {newCategoryUI()}
                            </div>}
                        </div>
                        <div className=" md:flex justify-end ">
                            <button type="submit" className="btn btn-success btn-rounded mr-3">
                                Confirm
                            </button>
                            <button
                                type="submit"
                                className="btn btn-rounded"
                                onClick={() => closeModal({ result: false })}
                            >
                                Cancel
                            </button>
                        </div>
                    </form> : <></>}
            </div>
        </Modal>
    );
}

export default AddBookmarkModal;
