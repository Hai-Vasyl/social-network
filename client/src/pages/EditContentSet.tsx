import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GET_CONTENTSET_SHORT } from "../fetching/queries"
import { useQuery } from "@apollo/client"
import { categories } from "../modules/contentCategories"
import { IField } from "../interfaces"
import ModForm from "../components/ModForm"
import LoaderData from "../components/LoaderData"
import Title from "../components/Title"
import Button from "../components/Button"
// @ts-ignore
import stylesForm from "../styles/form.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import Loader from "../components/Loader"
import { BsTrash, BsX, BsCheck } from "react-icons/bs"
// @ts-ignore
import bgImage from "../images/undraw_build_wireframe_u9m2.svg"

const EditContentSet = () => {
  const { contentId }: any = useParams()
  const {
    data: contentSetData,
    loading: loadContentSet,
  } = useQuery(GET_CONTENTSET_SHORT, { variables: { contentSetId: contentId } })
  const [form, setForm] = useState<IField[]>([
    {
      param: "content",
      type: "text",
      value: "",
      title: "Description",
      msg: "",
    },
    {
      param: "uploads",
      type: "files",
      value: [],
      title: "Upload media",
      msg: "",
    },
    {
      param: "category",
      type: "text",
      value: categories.nature.keyWord,
      title: "Category",
      msg: "",
    },
  ])
  const options = Object.keys(categories).map((key) => {
    // @ts-ignore
    return { value: categories[key].keyWord, label: categories[key].label }
  })

  useEffect(() => {
    const contentData = contentSetData && contentSetData.getContentSet
    if (contentData) {
      setForm((prevForm) =>
        prevForm.map((filed) => {
          let fieldValue = filed.value
          Object.keys(contentData).map((key) => {
            if (filed.param === key) {
              fieldValue = contentData[key]
            }
          })
          return { ...fieldValue, value: fieldValue }
        })
      )
    }
  }, [contentSetData])

  const handleChageField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (event.target.name === field.param) {
          return { ...field, msg: "", value: event.target.value }
        }
        return field
      })
    )
  }

  const handleChangeFieldFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === "uploads") {
          return { ...field, value: event.target.files, msg: "" }
        }
        return field
      })
    )
  }

  const handleSubmitForm = async () => {
    const [content, uploads, category] = form
    // createContentSet({
    //   variables: {
    //     content: content.value,
    //     uploads: uploads.value,
    //     category: category.value,
    //   },
    // })
  }

  const handleDelete = async () => {
    console.log("delete")
  }

  const handleResetForm = async () => {
    console.log("reset")
  }

  const handlePickOption = (value: string) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === "category") {
          return { ...field, value, msg: "" }
        }
        return field
      })
    )
  }

  if (loadContentSet) {
    return (
      <div className='wrapper'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='wrapper'>
      <Title title='Edit media content' />
      <div className={stylesForm.form}>
        <div className={stylesForm.form__fields}>
          <div className='form-wrapper'>
            {/* <LoaderData load={createDSData.loading} /> */}
            <ModForm
              handleChangeFieldFile={handleChangeFieldFile}
              handlePickOption={handlePickOption}
              form={form}
              options={options}
              handleChageField={handleChageField}
            />
            <div className={stylesBtn.btns}>
              <Button
                exClass={stylesBtn.btn_primary}
                click={handleSubmitForm}
                title='Apply changes'
                Icon={BsCheck}
              />
              <Button
                exClass={stylesBtn.btn_simple}
                click={handleResetForm}
                title='Cancell all'
                Icon={BsX}
              />
              <Button
                exClass={stylesBtn.btn_simple}
                click={handleDelete}
                Icon={BsTrash}
              />
            </div>
          </div>
        </div>
        <div className={stylesForm.form__bgImage}>
          <img src={bgImage} className={stylesForm.form__image} alt='bgImage' />
        </div>
      </div>
    </div>
  )
}

export default EditContentSet
