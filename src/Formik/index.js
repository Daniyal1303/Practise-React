import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const Form = () => {
  const [submit, setSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      product: "",
      brand: "",
      price: "",
      category: "",
      weight: "",
      description: "",
    },
    validationSchema: Yup.object({
      product: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      brand: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      price: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      const { product, brand, price, category, weight, description } = values;
      await fetch("http://localhost:7000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: product,
          brand: brand,
          price: price,
          category: category,
          weight: weight,
          description: description,
        }),
      })
        .then((response) => {
          console.log(response);
          setSubmit(true);
          formik.resetForm();
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <section className="bg-white dark:bg-gray-900 overflow-hidden ">
      <div className="py-8 px-4 mx-auto mt-5 max-w-2xl lg:py-16 shadow-2xl ">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="product"
                id="product"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.product}
              />
              {formik.touched.product && formik.errors.product ? (
                <div className="mt-2 mx-auto text-red-500 italic text-sm">
                  {formik.errors.product}
                </div>
              ) : null}
            </div>
            <div className="w-full">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
              />
              {formik.touched.brand && formik.errors.brand ? (
                <div className="mt-2 mx-auto text-red-500 italic text-sm">
                  {formik.errors.brand}
                </div>
              ) : null}
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="mt-2 mx-auto text-red-500 italic text-sm">
                  {formik.errors.price}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option defaultValue="Categories">Select category</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
              {formik.touched.category && formik.errors.category ? (
                <div className="mt-2 mx-auto text-red-500 italic text-sm">
                  {formik.errors.category}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="item-weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="12"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Add product
          </button>
        </form>
        {submit ? (
          <div className="mt-4">
            <p
              className={`bg-gradient-to-r from-gray-500 to-gray-800  px-4 py-2 text-center font-bold text-green-600 font-italic duration-500  ${setTimeout(
                () => {
                  setSubmit(false);
                },
                2000
              )}`}
            >
              product is submitted.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Form;
