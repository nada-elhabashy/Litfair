import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState, useContext } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import $ from "jquery";
import style from "../../styles/pages/Career.module.scss";
import {
  loadJobTitles,
  loadJobCategories,
} from "../../functions/Api/loadOptions";
import AuthContext from "../../context/AuthContext";
import { Router } from "react-router-dom";

const baseUrl = process.env.API_URL;

export const getStaticProps = async () => {
  const res = await fetch(baseUrl + "job-config");
  const { msg } = await res.json();

  return {
    props: { job: msg },
  };
};
const Career = (job) => {
  useEffect(() => {
    //level list interact
    const levelList = document.querySelectorAll("#level > li");

    for (let li of levelList) {
      li.addEventListener("click", function () {
        // 1. Remove Class from All Lis
        for (let li of levelList) {
          li.classList.remove(`${style.selected}`);
        }

        // 2. Add Class to Relevant Li
        this.classList.add(`${style.selected}`);
      });
    }

    //job list interact
    $(function () {
      $(".job-type").on("click", "li", function () {
        $(this).toggleClass(`${style.selected}`);
        $("i", this).toggleClass("fa-solid fa-plus");
        $("i", this).toggleClass("fa-solid fa-check");
      });
    });
  }, []);
  const { auth } = useContext(AuthContext);

  // variables
  const jobConfig = job.job;
  const router = useRouter();

  //state
  const [career_lvl, setCareer_lvl] = useState("");
  const [jobType, setJobType] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [currentState, setCurrentState] = useState("");
  const [submitting, setSubsubmitting] = useState(false);
  const [error, setError] = useState("");

  //functions
  const submit = async (e) => {
    //prevent page from reloading
    e.preventDefault();
    // change the submit button state
    setSubsubmitting(true);
    if (
      !career_lvl ||
      !jobType.length ||
      !jobTitles.length ||
      !jobCategories.length ||
      !currentState
    ) {
      setError("Fill the required fields!");
      setSubsubmitting(false);
      return;
    } else {
      setError("");
      console.log("token", auth);
      //customize state to be sent in body
      const jobTitle = jobTitles.map((title) => title.value);
      const jobCategory = jobCategories.map((title) => title.value);
      console.log(career_lvl);
      console.log(jobType);
      console.log(jobTitle);
      console.log(jobCategory);
      console.log(currentState);
      //waiting for api response
      let response = await fetch(baseUrl + "seeker/details/update", {
        method: "PUT",
        // mode: "cors",
        // credentials: "origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + auth,
        },
        body: JSON.stringify({
          career_lvl,
          jobType,
          jobTitle,
          jobCategory,
          currentState,
        }),
      })
        // handle response's different status
        .then(async (response) => {
          console.log(response);
          const err = await response.json();
          console.log(err);

          if (response.ok) {
            setSubsubmitting(false);
            router.push("/setup/general-info");

            if (popup) {
              popup.style.display = "none";
            }
            if (successPop) {
              successPop.style.display = "block";
            }
          }
          if (response.status === 400) {
            // So, a server-side validation error occurred.
            // Server side validation returns a string error message, so parse as text instead of json.
            const error = response.text();
            throw new Error(error);
          }
          if (response.status === 502) {
            response.json().then((data) => {
              const { sent } = data;
            });
            throw new Error("Network response was not ok.");
          }
        })
        .catch((e) => {
          setSubsubmitting(false);
          setError(e.toString());
        });
    }
  };

  return (
    <>
      <Head>
        <title>Career Interests | LitFair</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* num section in small screen sizes */}
      <section className={style.numsSmall}>
        <span>Step 1/3</span>
        <span>Career Interests</span>
      </section>
      <main className="container">
        {/* Num Section */}
        <section className={style.nums}>
          <div className={style.num}>
            <h3 className={style.activeNum}>1</h3>
            <h3>Career Interests</h3>
          </div>
          <div className={style.num}>
            <h3>2</h3>
            <h3>general info</h3>
          </div>
          <div className={style.num}>
            <h3>3</h3>
            <h3>Professional Info</h3>
          </div>
        </section>

        {/* End Num Section */}
        {/* Head Section */}
        <section className={style.head}>
          <h4>Career Interests</h4>
          <p>Provide Us The Information Enable Us To Recommend</p>
        </section>
        {/* End Head Section */}
        {/* Content Section */}
        <form onSubmit={(e) => submit(e)}>
          <article className={style.content}>
            <span>What is your current career level?</span>
            <ul id="level">
              {Object.keys(jobConfig.experience_type).map((key, index) => (
                <li
                  onClick={() => {
                    setCareer_lvl(jobConfig.experience_type[key]);
                  }}
                  key={key}
                >
                  {jobConfig.experience_type[key]}
                </li>
              ))}
            </ul>
          </article>
          <article className={style.content}>
            <span>What type(s) of jobs are you open to?</span>
            <ul className="job-type">
              {Object.keys(jobConfig.job_type).map((key, index) => (
                <li
                  key={key}
                  onClick={() => {
                    const current = jobType.find(
                      (type) => type === jobConfig.job_type[key]
                    );
                    if (!current)
                      setJobType([...jobType, jobConfig.job_type[key]]);
                    else {
                      setJobType(
                        jobType.filter((job) => job !== jobConfig.job_type[key])
                      );
                    }
                  }}
                >
                  {jobConfig.job_type[key]} <i className="fa-solid fa-plus"></i>
                </li>
              ))}
            </ul>
          </article>
          <article className={style.content}>
            <span>
              What are the job titles that describe what are looking for?
            </span>
            <AsyncPaginate
              className="text--career "
              value={jobTitles}
              placeholder="Ex. Developer"
              loadOptions={loadJobTitles}
              isMulti
              onChange={setJobTitles}
              closeMenuOnSelect={false}
            />
          </article>
          <article className={style.content}>
            <span>What job categories are you interested in?</span>
            <AsyncPaginate
              className="text--career "
              value={jobCategories}
              placeholder="Select..."
              loadOptions={loadJobCategories}
              isMulti
              onChange={setJobCategories}
              closeMenuOnSelect={false}
            />
          </article>
          <article className={style.content}>
            <span>What is your current job search status? </span>
            <select
              onChange={(e) => setCurrentState(e.target.value)}
              className="txt text--career form-select"
            >
              <option value="">Select ...</option>
              {Object.keys(jobConfig.job_status).map((key, index) => (
                <option value={jobConfig.job_status[key]} key={key}>
                  {jobConfig.job_status[key]}
                </option>
              ))}
            </select>
          </article>
          <span className="invalid cancel--onb">{error}</span>
          <button className="btn--global btn--blue  btn--onb" type="submit">
            {submitting ? "Saving..." : "Save and Continue"}
          </button>
        </form>
        {/* End Content Section */}
      </main>
    </>
  );
};
export default Career;
