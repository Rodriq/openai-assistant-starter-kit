import React, { useState } from "react";
interface RatingContent {
  id: number;
  svg: string;
  text: string;
}

interface Props {
  handleOpenReview: (value: boolean) => void;
}

const Feedback: React.FC<Props> = ({ handleOpenReview }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [userReview, setUserReview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("No");

  const ratingContent: RatingContent[] = [
    {
      id: 1,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="23" height="23"><defs><style>.cls-3{fill:#273941}.cls-4{fill:#141e21}.cls-5{fill:#f6fafd}.cls-7{fill:#ffb32b}</style></defs><g id="_23-sad" data-name="23-sad"><circle cx="24" cy="24" r="23" style="fill:#ffce52"/><path d="M37 35.667A3.179 3.179 0 0 1 34 39a3.179 3.179 0 0 1-3-3.333C31 33.826 33.25 29 34 29s3 4.826 3 6.667z" style="fill:#3bc5f6"/><path class="cls-3" d="M10 17v-2c3.722 0 6-1.295 6-2h2c0 2.626-4.024 4-8 4zM38 17c-3.976 0-8-1.374-8-4h2c0 .705 2.278 2 6 2zM24 35a10.343 10.343 0 0 0-4 1 4 4 0 0 1 8 0 10.343 10.343 0 0 0-4-1z"/><circle class="cls-3" cx="34" cy="22" r="5"/><circle class="cls-3" cx="14" cy="22" r="5"/><circle class="cls-4" cx="34" cy="22" r="4"/><circle class="cls-4" cx="14" cy="22" r="4"/><circle class="cls-5" cx="35.5" cy="20.5" r="1.5"/><circle class="cls-5" cx="32.5" cy="23.5" r="1.5"/><circle class="cls-5" cx="35.5" cy="23.5" r=".5"/><circle class="cls-5" cx="12.5" cy="20.5" r="1.5"/><circle class="cls-5" cx="15.5" cy="23.5" r="1.5"/><circle class="cls-5" cx="12.5" cy="23.5" r=".5"/><path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill:#ffe369"/><path class="cls-7" d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z"/><ellipse class="cls-5" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)"/><ellipse class="cls-5" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)"/><ellipse class="cls-5" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)"/><path d="M34.135 29.047c.723.439 2.365 3.908 2.365 5.286a2.505 2.505 0 1 1-5 0c0-1.378 1.642-4.847 2.365-5.286-.852.469-2.865 4.877-2.865 6.62A3.179 3.179 0 0 0 34 39a3.179 3.179 0 0 0 3-3.333c0-1.743-2.013-6.151-2.865-6.62z" style="fill:#00a3e1"/><ellipse class="cls-5" cx="35" cy="35" rx=".825" ry="1.148" transform="rotate(-45.02 35 35)"/><ellipse class="cls-5" cx="35.746" cy="33.5" rx=".413" ry=".574" transform="rotate(-45.02 35.746 33.5)"/><path class="cls-7" d="M34 39a3.048 3.048 0 0 1-2.853-2.354A4.808 4.808 0 0 0 31 37.667 3.179 3.179 0 0 0 34 41a3.179 3.179 0 0 0 3-3.333 4.808 4.808 0 0 0-.147-1.021A3.048 3.048 0 0 1 34 39z"/></g></svg>`,
      text: "Terrible",
    },
    {
      id: 2,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="23" height="23"><defs><style>.cls-2{fill:#273941}.cls-3{fill:#141e21}.cls-4{fill:#f6fafd}</style></defs><g id="_12-neutral" data-name="12-neutral"><circle cx="24" cy="24" r="23" style="fill:#ffce52"/><ellipse class="cls-2" cx="33" cy="18" rx="3" ry="4"/><ellipse class="cls-2" cx="15" cy="18" rx="3" ry="4"/><ellipse class="cls-3" cx="33" cy="18" rx="2" ry="3"/><ellipse class="cls-3" cx="15" cy="18" rx="2" ry="3"/><circle class="cls-4" cx="34" cy="17" r="1"/><circle class="cls-4" cx="16" cy="17" r="1"/><path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill:#ffe369"/><path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" style="fill:#ffb32b"/><path class="cls-2" d="M16 32h16v2H16z"/><ellipse class="cls-4" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)"/><ellipse class="cls-4" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)"/><ellipse class="cls-4" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)"/></g></svg>`,
      text: "Bad",
    },
    {
      id: 3,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="23" height="23"><defs><style>.cls-2{fill:#273941}.cls-5{fill:#f6fafd}</style></defs><g id="_03-smile" data-name="03-smile"><circle cx="24" cy="24" r="23" style="fill:#ffce52"/><path class="cls-2" d="M24 39c-7.168 0-13-4.935-13-11h2c0 4.962 4.935 9 11 9s11-4.038 11-9h2c0 6.065-5.832 11-13 11zM20 21h-2c0-2.206-1.346-4-3-4s-3 1.794-3 4h-2c0-3.309 2.243-6 5-6s5 2.691 5 6zM38 21h-2c0-2.206-1.346-4-3-4s-3 1.794-3 4h-2c0-3.309 2.243-6 5-6s5 2.691 5 6z"/><path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill:#ffe369"/><path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" style="fill:#ffb32b"/><ellipse class="cls-5" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)"/><ellipse class="cls-5" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)"/><ellipse class="cls-5" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)"/></g></svg>`,
      text: "Okay",
    },
    {
      id: 4,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="23" height="23"><defs><style>.cls-2{fill:#273941}.cls-3{fill:#141e21}.cls-4{fill:#f6fafd}.cls-6{fill:#ffb32b}</style></defs><g id="_11-wow" data-name="11-wow"><circle cx="24" cy="24" r="23" style="fill:#ffce52"/><ellipse class="cls-2" cx="33" cy="18" rx="3" ry="4"/><ellipse class="cls-2" cx="15" cy="18" rx="3" ry="4"/><ellipse class="cls-3" cx="33" cy="18" rx="2" ry="3"/><ellipse class="cls-3" cx="15" cy="18" rx="2" ry="3"/><circle class="cls-4" cx="34" cy="17" r="1"/><circle class="cls-4" cx="16" cy="17" r="1"/><path class="cls-2" d="M37 10h-2a2 2 0 0 0-4 0h-2a4 4 0 0 1 8 0zM19 10h-2a2 2 0 0 0-4 0h-2a4 4 0 0 1 8 0z"/><path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill:#ffe369"/><path class="cls-6" d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z"/><ellipse class="cls-4" cx="34" cy="5" rx=".825" ry="1.148" transform="rotate(-45.02 34 5)"/><ellipse class="cls-4" cx="26.746" cy="3.5" rx=".413" ry=".574" transform="rotate(-45.02 26.746 3.5)"/><ellipse class="cls-4" cx="30" cy="4" rx="1.65" ry="2.297" transform="rotate(-45.02 30 4)"/><ellipse class="cls-2" cx="24" cy="34" rx="6" ry="9"/><path d="M24 43c2.542 0 4.71-2.375 5.584-5.723a7.985 7.985 0 0 0-11.168 0C19.29 40.625 21.458 43 24 43z" style="fill:#ae2d4c"/><path class="cls-6" d="M24 43c-3.088 0-5.629-3.5-5.961-8-.024.329-.039.662-.039 1 0 4.971 2.686 9 6 9s6-4.029 6-9c0-.338-.015-.671-.039-1-.332 4.5-2.873 8-5.961 8z"/><path class="cls-3" d="M24 27c3.088 0 5.629 3.5 5.961 8 .024-.329.039-.662.039-1 0-4.971-2.686-9-6-9s-6 4.029-6 9c0 .338.015.671.039 1 .332-4.5 2.873-8 5.961-8z"/><path d="M24 41c-2.132 0-3.989-1.682-5.052-4.2a7.95 7.95 0 0 0-.532.473C19.29 40.625 21.458 43 24 43s4.71-2.375 5.584-5.723a7.95 7.95 0 0 0-.532-.473C27.989 39.318 26.132 41 24 41z" style="fill:#8a293d"/></g></svg>`,
      text: "Good",
    },
    {
      id: 5,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="23" height="23"><defs><style>.cls-4{fill:#f6fafd}.cls-6{fill:#ae2d4c}.cls-7{fill:#cf4054}.cls-10{fill:#fbb40a}</style></defs><g id="_13-love" data-name="13-love"><circle cx="24" cy="24" r="23" style="fill:#ffce52"/><path d="M24 4c12.15 0 22 8.507 22 19h.975a23 23 0 0 0-45.95 0H2C2 12.507 11.85 4 24 4z" style="fill:#ffe369"/><path d="M46 23c0 10.493-9.85 19-22 19S2 33.493 2 23h-.975c-.014.332-.025.665-.025 1a23 23 0 0 0 46 0c0-.335-.011-.668-.025-1z" style="fill:#ffb32b"/><ellipse class="cls-4" cx="37" cy="9" rx=".825" ry="1.148" transform="rotate(-45.02 37 9)"/><ellipse class="cls-4" cx="30.746" cy="4.5" rx=".413" ry=".574" transform="rotate(-45.02 30.745 4.5)"/><ellipse class="cls-4" cx="34" cy="7" rx="1.65" ry="2.297" transform="rotate(-45.02 34 7)"/><path d="M34 39c0-2.76-4.47-5-10-5s-10 2.24-10 5l-.1.13A10.727 10.727 0 0 1 9 30.15 2.025 2.025 0 0 1 10.87 28c1.88 1.08 6.39 1 13.13 1s11.25.08 13.12-1A2.026 2.026 0 0 1 39 30.15a10.727 10.727 0 0 1-4.9 8.98z" style="fill:#273941"/><path class="cls-6" d="m34 39 .1.13A17.882 17.882 0 0 1 24 42a17.882 17.882 0 0 1-10.1-2.87L14 39c0-2.76 4.47-5 10-5s10 2.24 10 5z"/><path class="cls-7" d="M16.5 9a4.465 4.465 0 0 1 4.5 4.8C21 21 13.5 25 12 25c-.72 0-8.38-3.7-8.97-10.39Q3 14.205 3 13.8a4.451 4.451 0 0 1 3.58-4.7A4.053 4.053 0 0 1 7.5 9c2.25 0 3.75 1.6 4.5 4 .75-2.4 2.25-4 4.5-4zM45 13.8q0 .4-.03.81C44.44 21.3 37.44 25 36 25c-.75 0-9-4-9-11.2A4.465 4.465 0 0 1 31.5 9c2.25 0 3.75 1.6 4.5 4 .75-2.4 2.25-4 4.5-4a4.053 4.053 0 0 1 .92.1A4.451 4.451 0 0 1 45 13.8z"/><path d="M10.87 30c1.88 1.08 6.39 1 13.13 1s11.25.08 13.12-1a1.926 1.926 0 0 1 1.793 1.536A11.043 11.043 0 0 0 39 30.15 2.026 2.026 0 0 0 37.12 28c-1.87 1.08-6.38 1-13.12 1s-11.25.08-13.13-1A2.025 2.025 0 0 0 9 30.15a11.015 11.015 0 0 0 .087 1.385A1.92 1.92 0 0 1 10.87 30z" style="fill:#141e21"/><path d="M33.531 37.486A18.171 18.171 0 0 1 24 40a18.171 18.171 0 0 1-9.531-2.514A2.809 2.809 0 0 0 14 39l-.1.13A17.882 17.882 0 0 0 24 42a17.882 17.882 0 0 0 10.1-2.87L34 39a2.809 2.809 0 0 0-.469-1.514z" style="fill:#8a293d"/><path class="cls-10" d="M36 25c-.71 0-8.131-3.59-8.921-10.081A6 6 0 0 0 27 15.8C27 23 35.25 27 36 27c1.44 0 8.44-3.7 8.97-10.39q.03-.41.03-.81a6.079 6.079 0 0 0-.07-.907C44.225 21.4 37.419 25 36 25zM12 25c-.71 0-8.131-3.59-8.921-10.081A6 6 0 0 0 3 15.8C3 23 11.25 27 12 27c1.44 0 8.44-3.7 8.97-10.39q.03-.41.03-.81a6.079 6.079 0 0 0-.07-.907C20.225 21.4 13.419 25 12 25z"/><path class="cls-6" d="M40.5 9c-2.25 0-3.75 1.6-4.5 4 .583-1.8 1.75-3 3.5-3a3.408 3.408 0 0 1 3.5 3.6c0 5.4-5.833 8.4-7 8.4-.56 0-6.518-2.775-6.977-7.793A8.167 8.167 0 0 1 29 13.6a3.366 3.366 0 0 1 2.784-3.525A3.243 3.243 0 0 1 32.5 10c1.75 0 2.917 1.2 3.5 3-.75-2.4-2.25-4-4.5-4a4.053 4.053 0 0 0-.92.1A4.451 4.451 0 0 0 27 13.8q0 .4.03.81C27.62 21.3 35.28 25 36 25c1.5 0 9-4 9-11.2A4.465 4.465 0 0 0 40.5 9zM16.5 9c-2.25 0-3.75 1.6-4.5 4 .583-1.8 1.75-3 3.5-3a3.408 3.408 0 0 1 3.5 3.6c0 5.4-5.833 8.4-7 8.4-.56 0-6.518-2.775-6.977-7.793A8.25 8.25 0 0 1 5 13.6a3.366 3.366 0 0 1 2.784-3.525A3.243 3.243 0 0 1 8.5 10c1.75 0 2.917 1.2 3.5 3-.75-2.4-2.25-4-4.5-4a4.053 4.053 0 0 0-.92.1A4.451 4.451 0 0 0 3 13.8q0 .4.03.81C3.62 21.3 11.28 25 12 25c1.5 0 9-4 9-11.2A4.465 4.465 0 0 0 16.5 9z"/><ellipse class="cls-4" cx="42" cy="13" rx=".825" ry="1.148" transform="rotate(-45.02 41.999 13)"/><ellipse class="cls-4" cx="40.746" cy="11.5" rx=".413" ry=".574" transform="rotate(-45.02 40.746 11.5)"/><ellipse class="cls-4" cx="18" cy="13" rx=".825" ry="1.148" transform="rotate(-45.02 18 13)"/><ellipse class="cls-4" cx="16.746" cy="11.5" rx=".413" ry=".574" transform="rotate(-45.02 16.745 11.5)"/></g></svg>`,
      text: "Amazing",
    },
  ];

  const options = [
    { id: "No", label: "No" },
    { id: "Maybe", label: "Maybe" },
    { id: "Yes", label: "Yes" },
  ];

  const handleRatingClick = (id: number) => {
    setRating(id);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log("selectedOption: ", selectedOption);
      const phoneNumber = localStorage.getItem("userPhone")!.replace(/\s/g, "");
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: ratingContent[rating! - 1]?.text,
          review: userReview,
          user_phone: phoneNumber,
          need_ai: selectedOption,
        }),
      });
      handleOpenReview(false);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 text-start flex justify-center bg-black bg-opacity-50 z-[105] overflow-y-auto py-[10vh] px-4">
      <div className="relative bg-white rounded-lg shadow-lg text-center h-fit">
        <div
          className={`flex absolute bg-white -right-3 -top-3 items-center justify-center border rounded-full py-3.5 hover:cursor-pointer h-10 w-10 border-blue-500 shadow-lg shadow-blue-500/50`}
          onClick={() => handleOpenReview(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 12.727l-3.244 3.252q-.161.16-.358.15t-.358-.17t-.16-.363t.16-.363L11.274 12L8.04 8.782q-.16-.161-.16-.367t.16-.368t.364-.16q.204 0 .363.16L12 11.298l3.219-3.252q.161-.16.358-.16t.358.16q.165.166.165.367t-.165.36L12.702 12l3.252 3.244q.16.161.16.358t-.16.358q-.166.165-.367.165t-.36-.165z"
            />
          </svg>
        </div>

        <div className="rounded-md p-9 md:p-14 w-full sm:min-w-[30rem]">
          <div>
            <p className="pb-2 text-start text-lg font-bold md:text-xl">
              Feedback
            </p>
            <p className="text-sm text-start">
              What do you think about this AI Law Helper and the responses it
              provides?
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-3 py-6 sm:grid-cols-4 md:grid-cols-5">
            {ratingContent.map((ratx) => (
              <div
                key={ratx.id}
                className={`flex items-center justify-center rounded border py-3.5 hover:cursor-pointer md:py-3 ${
                  rating === ratx.id
                    ? "border-blue-500 shadow-lg shadow-blue-500/50"
                    : ""
                }`}
                onClick={() => handleRatingClick(ratx.id)}
              >
                <div className="space-y-1">
                  <div className="flex w-full justify-center">
                    <span dangerouslySetInnerHTML={{ __html: ratx.svg }} />
                  </div>
                  <p className="text-center text-[11px]">{ratx.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <p className="text-sm text-start mb-5">
              Would you like to get AI implemented in your business?
            </p>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
              {options.map((item, index) => (
                <li
                  key={item.id}
                  className={`w-full border-b border-gray-200 sm:border-b-0 ${
                    index !== options.length - 1 ? "sm:border-r" : ""
                  }`}
                >
                  <div className="flex items-center ps-3">
                    <input
                      id={`option-${item.id}`}
                      type="radio"
                      name="selection"
                      value={item.id}
                      checked={selectedOption === item.id}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor={`option-${item.id}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 text-start cursor-pointer"
                    >
                      {item.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <p className="pb-3 font-medium text-start">Review</p>
            <textarea
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 active:border-blue-400"
              placeholder="Leave a review..."
            ></textarea>
            <button
              type="button"
              disabled={isSubmitting || !rating}
              className="text-white w-full mt-5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleSubmit()}
            >
              {isSubmitting ? (
                <div className="inline-flex items-center gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5"
                  >
                    <g>
                      <circle
                        cx="12"
                        cy="2.5"
                        r="1.5"
                        fill="currentColor"
                        opacity=".14"
                      />
                      <circle
                        cx="16.75"
                        cy="3.77"
                        r="1.5"
                        fill="currentColor"
                        opacity=".29"
                      />
                      <circle
                        cx="20.23"
                        cy="7.25"
                        r="1.5"
                        fill="currentColor"
                        opacity=".43"
                      />
                      <circle
                        cx="21.5"
                        cy="12"
                        r="1.5"
                        fill="currentColor"
                        opacity=".57"
                      />
                      <circle
                        cx="20.23"
                        cy="16.75"
                        r="1.5"
                        fill="currentColor"
                        opacity=".71"
                      />
                      <circle
                        cx="16.75"
                        cy="20.23"
                        r="1.5"
                        fill="currentColor"
                        opacity=".86"
                      />
                      <circle cx="12" cy="21.5" r="1.5" fill="currentColor" />
                      <animateTransform
                        attributeName="transform"
                        calcMode="discrete"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
                      />
                    </g>
                  </svg>{" "}
                  Sending...
                </div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
