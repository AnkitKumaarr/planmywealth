import React from "react";
import ReportSection from "./ReportSection";
import { FaFileAlt, FaPhoneAlt, FaFolderOpen, FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import '../../../src/app/globals.css'

const PDF = ({ user, report }) => {
  return (
    <div className="w-full h-full p-8">
      <div
       className="px-4 lg:px-20 py-4 mt-16 lg:mt-0 print:px-0 print:mt-0"
        id="feature-recipe"
      >
        {/* Header Section Page 1  */}

        <section className="pdf-section mt-20">
          <div className="">
            <h2 className="text-xl font-bold">
              🎉 {user?.name?.split(" ")[0]}! Your Report is Ready!
            </h2>
          </div>
        </section>

        <section className="pdf-section">
          <div className="pdf-content">
            <h1 className="text-3xl font-semibold mb-8">
              Here's the smartest way to financially secure your family
            </h1>
          </div>
        </section>

        {/* Dynamic Sections */}
        <section className="pdf-section">
          <div className="pdf-content">
            <>
              {/* 1st section */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  1. Additional Term Insurance cover your family needs
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className="text-2xl font-bold border-b-4 pb-2 border-green-600">
                      {report?.additionalCoverNeeded}
                    </div>
                    <p className="text-gray-600 text-xs">
                      Minimum Term Insurance cover your family needs{" "}
                      {report?.additionalCoverNeeded} - Cover you already have{" "}
                      {report?.termInsuranceAmount === ""
                        ? "₹ 0"
                        : report?.termInsuranceAmount}
                    </p>
                  </div>
                </div>
                <p className=" mt-2 text-sm font-bold">
                  Ensure Your Family's Financial Security with Term Insurance
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      A term plan safeguards your family's lifestyle and goals,
                      even if you're not around. By investing in a term plan,
                      your nominee can invest the sum of Death Maturity in Basic
                      Fixed Deposit (6-7% interest) to cover day-to-day expenses
                      for the next 15 years. The principal can also help fulfill
                      key goals like child education, loan repayment, and
                      marriage.
                    </li>
                    <li>
                      With adequate coverage, you can rest easy knowing that
                      your family won't face financial stress, regardless of the
                      circumstances.
                    </li>
                  </ul>
                </div>
              </section>
              {/* 2nd section */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  2. Additional Health Insurance cover your family needs
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className="text-2xl font-bold border-b-4 pb-2 border-green-600 mr-8">
                      {report?.additionalHealthCoverNeeded || "₹0"}
                    </div>
                    <p className="text-gray-600 text-xs ">
                      Minimum Sum Insured cover your family needs{" "}
                      {report?.additionalHealthCoverNeeded || "₹ 0"} Cover you
                      already have{" "}
                      {report?.healthInsuranceAmount === ""
                        ? "₹ 0"
                        : report?.healthInsuranceAmount}{" "}
                      <br />
                      Do Port/Switch Your Existing Old Insurance to Latest and
                      Best One.
                    </p>
                  </div>
                </div>
                <p className=" mt-2 text-sm font-bold">
                  Why Health Insurance is Essential
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      The Covid-19 pandemic has shown how unpredictable medical
                      emergencies can be, potentially leading to financial
                      strain. Without health insurance, your savings and wealth
                      could be at risk during a medical crisis. Based on your
                      income, a minimum cover of
                      {report?.additionalHealthCoverNeeded || " ₹ 0"} is
                      recommended
                    </li>
                  </ul>
                </div>
              </section>
              {/* 3rd section */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  3. You should keep your Term Insurance cover until
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className="text-2xl font-bold border-b-4 pb-2 border-green-600">
                      {report?.age}yrs
                    </div>
                    <div className="flex flex-col ml-4">
                      <p className="text-gray-600 text-xs">
                        You should stop your term insurance cover once you have
                        or accumulated enough wealth to take care fulfilled your
                        financial responsibilities, of your family's future
                        expenses.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Note, you will pay ~5% extra premium for every year you extend
                  your term insurance cover up to 100 years of Age.
                </p>
              </section>
              {/* 4th section */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  4. Plan how your nominee will receive the claim amount
                </h2>
                <div className="bg-blue-100 flex flex-col md:flex-row items-center gap-2 p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-bold ">
                      {report?.nomineeReaction ===
                      "Will Be Able To Manage It Confidently - Without A Sweat"
                        ? "Fixed Lump Sum "
                        : "Lumpsum + Monthly Income payout option"}
                    </div>
                    <p className="text-gray-600 text-xs"></p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {report?.nomineeReaction ===
                  "Will Be Able To Manage It Confidently - Without A Sweat" ? (
                    <p>
                      Based on your answers, we recommend that you opt for{" "}
                      <span className="font-bold">Fixed Lump Sum.</span> This
                      option will give your nominee one large payout on your
                      death.
                    </p>
                  ) : (
                    <p>
                      Based on your answers, we recommend that you opt for{" "}
                      <span className="font-bold">
                        Lumpsum + Monthly Income payout option.
                      </span>{" "}
                      This option will break the amount payable into one large
                      payout on death, and then a monthly income every year.
                    </p>
                  )}
                </p>
              </section>
              {/* 5th section */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  5. Build an Emergency Fund
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className="text-2xl font-bold border-b-4 pb-2 border-green-600">
                      {report?.emergencyFundNeeded || "₹ 0"}
                    </div>
                    <p className="text-gray-600 text-xs">
                      Most of us have fixed monthly commitments like EMIs,
                      Household Expenses, Fuel costs, Rentals etc.
                    </p>
                  </div>
                </div>
                <p className=" mt-2 text-sm font-bold">Analysis</p>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      You should have at least 3 to 6 months of backup as an
                      emergency fund. You are prepared for this challenge,
                      that's very smart. Very often wealth created over a long
                      period of time gets eroded overnight during unforeseen
                      financial emergencies. Be prepared always
                    </li>
                    <li>
                      Covid-19 taught us that sudden loss of income can be more
                      common than ever. An emergency fund allows you to live for
                      a few months if you lose your income.
                    </li>
                  </ul>
                </div>
              </section>
              {/* 6th section children education inflation */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  6. Build fund for child education
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex flex-col items-start mr-4">
                      <div className="text-sm text-gray-600">
                        Current Cost: {report?.educationExpenses || "0"}
                      </div>

                      <p className="text-sm mt-2">
                        Future Cost: {"   "}
                        <span className="text-2xl font-bold border-b-4 pb-2 border-green-600">
                          {report?.educationInflation || "0"}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="text-gray-600 text-xs">
                        This Is the future cost that could rise by the time your
                        child is ready for higher education with an estimated 6%
                        p.a inflation.
                      </p>
                    </div>
                  </div>
                </div>
                <p className=" mt-2 text-sm font-bold mt-44">Analysis</p>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      Education costs tend to rise faster than general
                      inflation. To avoid the burden of loans, debts, or
                      depleting your life savings, it's crucial to start
                      planning and allocating funds now.
                    </li>
                    <li>
                      By setting up a dedicated savings or investment plan
                      today, you can ensure that you provide the best education
                      for your child without financial stress in the future.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 7th section children wedding inflation */}
              <section>
                <h2 className="text-md font-bold mb-4 mt-4">
                  7. Build fund for child Wedding
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex flex-col items-start mr-4">
                      <div className="text-sm text-gray-600">
                        Current Cost: {report?.weddingExpenses || "0"}
                      </div>

                      <p className="text-sm mt-2">
                        Future Cost: {"   "}
                        <span className="text-2xl font-bold border-b-4 pb-2 border-green-600">
                          {report?.weddingInflation || "0"}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="text-gray-600 text-xs">
                        This Is the future cost that could rise by the time your
                        child is ready for their big day with an estimated 6%
                        p.a inflation.
                      </p>
                    </div>
                  </div>
                </div>
                <p className=" mt-2 text-sm font-bold">Analysis</p>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      Wedding expenses can be substantial. To avoid taking on
                      loans, accumulating debts, or draining your life savings,
                      it's important to start planning and allocating funds now
                    </li>
                    <li>
                      By setting up a dedicated savings or investment plan
                      today, you can ensure a memorable and beautiful wedding
                      for your child without financial stress. Speak to an
                      advisor to structure a wedding fund that grows with
                      inflation, securing a joyful and worry-free celebration in
                      the future.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 8th section expenses inflation */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  8. Build fund for Retirement
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex flex-col items-start mr-4">
                      <div className="text-sm text-gray-600">
                        Current Cost:{" "}
                        {report?.knowsLivingExpenses
                          ? report?.monthlyExpenses
                          : report?.totalMonthlyExpenses || "0"}
                      </div>
                      <div className="text-sm">
                        Future Cost: {report?.monthlyExpensesInflation || "0"}{" "}
                        per month
                      </div>

                      <p className=" mt-2 text-2xl font-bold border-b-4  pb-2 border-green-600">
                        {report?.retirementMonthlyExpensesInflation || "0"}
                      </p>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="text-gray-600 text-xs">
                        Total Corpus/funds you need at the age of {report?.age}{" "}
                        in order to maintain your current lifestyle by Doing
                        Monthly Systematic Withdrawal Plan (SWP). The figure is
                        calculated using your current spendings and the average
                        inflation rate in India
                      </p>
                    </div>
                  </div>
                </div>
                <p className=" mt-2 text-sm font-bold">Analysis</p>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      Retirement income plans are often unpredictable due to
                      uncertainties like longevity and market fluctuations. To
                      ensure financial security, it's essential to consider a
                      lifetime annuity with inflation protection, which provides
                      guaranteed monthly or annual income for life. Consult with
                      your financial advisor about available annuity plans
                    </li>
                    <li>
                      A key retirement goal is to be debt-free by age 65. This
                      includes clearing credit card debt, car loans, and
                      mortgages. Many parents take loans later in life for
                      children's education or weddings, but this should be
                      avoided to ensure a secure retirement.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 9th section */}
              <section>
                <h2 className="text-md font-bold mb-4">
                  9. Choose the Following add-on Ridders
                </h2>
                <div className="bg-blue-100 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    {/* <div className="text-2xl font-bold border-b-4 pb-2 border-green-600">
              {report?.emergencyFund || "₹ 0"}
            </div> */}
                    <p className="text-xs font-bold">
                      Critical Illness & Waiver of Premium
                    </p>
                  </div>
                </div>
                <p className=" mt-2 text-sm font-bold">Analysis</p>
                <div className="mt-2 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <span className="font-bold">Critical Illness:</span> A
                      serious disease can impact your earnings and put a big
                      dent in your savings. A Critical Illness rider can help
                      you and your family sail through that financial mess,
                      without hassle. Riders are slightly restrictive but more
                      cost-efficient than standalone critical illness plans.
                    </li>
                    <li>
                      <span className="font-bold">Waiver of Premium:</span> In
                      case you suffer from a serious disease or disability,
                      you'll not have to pay your remaining premiums and keep
                      the cover until end of the term.
                    </li>
                  </ul>
                </div>
              </section>

              <div className="mt-6 border-2 border-green-300 rounded-lg mb-16">
                <AdvisorProfileSection flow={"horizontal"} />
              </div>
              <section className="border-2 border-green-300 p-4 rounded-lg mt-64">
                <h2 className="text-lg font-bold text-green-600 mb-4">
                  Other Recommendations
                </h2>

                {/* Recommendation 1 */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">
                    1. Buy your policy under the Married Women's Property Act
                  </h3>
                  <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
                    <li>
                      The MWP Act helps you secure your claim payout, and give
                      your wife absolute rights to your claim amount. No other
                      family member, bank or lender can claim it.
                    </li>
                    <li>
                      Request for the MWP Annexure from the insurer while
                      filling the proposal form itself.
                    </li>
                    <li>
                      Psst... This customization is irrevocable. Even you cannot
                      change the nominee once this deal is sealed. (Even in case
                      of a divorce)
                    </li>
                  </ul>
                </div>

                {/* Recommendation 2 */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">
                    2. Have a Monthly SIP
                  </h3>
                  <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
                    <li>
                      In Today's Modern world, It's a must to save at least 5%
                      in SIP. You have been doing this and it can benefit you in
                      long run.
                    </li>
                    <li>
                      Compared to traditional fixed deposits or recurring
                      deposits, SIP provides double the returns. SIP provides
                      you with tremendous flexibility, it can save tax if
                      invested in ELSS, it has high liquidity and hence can be
                      used as an emergency fund as well, the returns are much
                      higher and can help you beat inflation. If you stay
                      invested for the long term, the compounding effect makes
                      your returns much higher.
                    </li>
                  </ul>
                </div>

                {/* Recommendation 3 */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">
                    3. Save at least 15% of your income
                  </h3>
                  <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
                    <li>
                      Not saving 15% per month will adversely affect your
                      financial health. Your Goals may not be achieved, Your
                      future may be uncertain and financial emergencies may pull
                      you down.
                    </li>
                    <li>
                      Investing a set amount every month inculcates the habit of
                      saving in an individual. Moreover, this also motivates one
                      to look for ways to save more by controlling their
                      expenses. If you can achieve to save more than 15% each
                      month, it's a triple advantage as you get to set aside an
                      investment amount, save for emergencies, as well look for
                      ways to cut down on expenses.
                    </li>
                    <li>
                      Ensure that at least 70% of this saved amount is invested
                      in financial instruments. Dedicate a portion of these
                      investments to your financial goals.
                    </li>
                  </ul>
                </div>

                {/* Recommendation 4 */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">
                    4. Build more assets
                  </h3>
                  <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
                    <li>
                      Commercial real estate is one of the best ways to earn
                      regular passive income. The rental received takes care of
                      inflation and also allows you to earn additional gains,
                      the long-term property appreciation is the double benefit.
                      This passive income shall allow you to have more savings
                      which could be aligned to financial goals like your
                      retirement plan or child's education/marriage.
                    </li>
                    <li>
                      70% of the clients we serve don't have this investment.
                      You are among them! If planned properly you can own a
                      commercial property in the next 5 years and benefit from
                      it for the next 20 years.
                    </li>
                  </ul>
                </div>

                {/* Recommendation 5 */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">
                    5. Have a Personal Accident Plan
                  </h3>
                  <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
                    <li>
                      If you've had an accident that has led to disability or
                      you've been diagnosed with a critical illness, chances are
                      you'll be unable to work for quite some time. In such a
                      scenario, insurance with critical illness and disability
                      coverage can replace a portion of your income. You can use
                      the proceeds to pay for your most essential expenses
                      including food, utility bills, household supplies and
                      child care.
                    </li>
                    <li>
                      You DON'T have a disability insurance plan for you and
                      that's not good. We strongly suggest you consult our
                      expert to know more about this plan
                    </li>
                  </ul>
                </div>
              </section>

              <div className="mt-32 border-2 border-green-300 rounded-lg">
                <AdvisorProfileSection flow={"horizontal"} />
              </div>

              {/* Things you cannot ignore when you are buying the plan */}
              <section className="mt-80" id="things-to-remember">
                <h2 className="text-2xl font-bold mb-4">
                  Things you cannot ignore when you are buying the plan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
                    <FaFileAlt className="text-6xl text-blue-500 mb-4" />
                    <div className="flex flex-col items-center justify-center p-4">
                      <h3 className="text-md font-semibold mb-2">
                        Proposal Form
                      </h3>
                      <p className="text-gray-600 text-sm text-justify">
                        Insurers reject thousands of claims each year due to
                        wrong information. Don't give them that chance. Fill the
                        proposal form by yourself, providing information
                        diligently, to the best of your knowledge.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
                    <FaPhoneAlt className="text-6xl text-blue-500 mb-4" />
                    <div className="flex flex-col items-center justify-center p-4">
                      <h3 className="text-md font-semibold mb-2">
                        Activate Auto Debit
                      </h3>
                      <p className="text-gray-600 text-sm">
                        10–15% customers forget renewing their policies on time,
                        and leave their families without a cover. Putting
                        standing instructions for premium payments is the
                        easiest way to ensure this doesn't happen to you. Also,
                        watch out for any payment-failure communication from
                        your bank.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
                    <FaFolderOpen className="text-6xl text-blue-500 mb-4" />
                    <div className="flex flex-col items-center justify-center p-4">
                      <h3 className="text-md font-semibold mb-2">
                        Maintain Electronic Records
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Store a digital copy of the policy in an Electronic
                        Insurance Account (eIA) provided by your insurer, on
                        DigiLocker or simply on an online folder. This way, the
                        policy remains accessible to your family members,
                        always.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
                    <FaWallet className="text-6xl text-blue-500 mb-4" />
                    <div className="flex flex-col items-center justify-center p-4">
                      <h3 className="text-md font-semibold mb-2">
                        Inform your nominee
                      </h3>
                      <p className="text-gray-600 text-sm">
                        There have been numerous cases where the nominee is
                        unaware of the policies taken by the deceased family
                        member. Family members struggle to find the records and
                        make claims. It is important to ensure that your nominee
                        is aware of the policy as well as the details of the
                        policy, where it is stored so that when the need arises
                        your family can make use of your sound financial
                        decision of buying a term insurance policy.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-6 border-2 border-green-300 rounded-lg ">
                <AdvisorProfileSection flow={"horizontal"} />
              </div>
            </>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="pdf-section">
          <div className="pdf-content">
            <div className="mt-24 mb-12">
              <p className="text-xs text-gray-600">
                <span className="font-bold">Disclaimer:</span> While we will
                refer to you only advisors who are credible, whom we have
                personally interviewed, but at the same time you are free to
                evaluate their services independently and decide whether you
                want to go ahead with them or not. Plan My Wealth won't be
                liable or responsible for the conversations, decisions happening
                between you and the advisor.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const AdvisorProfileSection = ({ flow }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="bg-blue-100 rounded-lg p-4 sm:p-6 w-full print:w-full">
      <div
        className={`gap-6 ${
          flow === "horizontal" ? "lg:flex-row flex flex-col" : "flex flex-col"
        } w-full`}
      >
        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center flex-1 mb-6 lg:mb-0">
          <span className="bg-yellow-400 text-black px-4 py-1 pb-6 rounded-full text-sm inline-block mb-4 whitespace-nowrap">
            👤 Advisor Matched To You
          </span>
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 rounded-full overflow-hidden bg-gray-100">
            {!imageError && false ? (
              <img
                src={
                  process.env.NEXT_PUBLIC_APP_URL + "/images/harshiteimage.jpeg"
                }
                alt="Advisor Harshit"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <CgProfile className="w-full h-full text-gray-400" />
            )}
          </div>
          <div className="text-green-500 text-sm mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            VERIFIED
          </div>
          <h3 className="text-xl font-bold mb-1 text-center">Pooja</h3>
          <p className="text-gray-600 mb-4 text-center">Perfect Consultant</p>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center items-center lg:items-start flex-1">
          {flow === "horizontal" && (
            <>
              <h3 className="text-xl font-bold mb-2 text-center lg:text-left w-full">
                Need an expert's help?
              </h3>
              <p className="text-gray-600 mb-4 text-sm text-center lg:text-left w-full">
                Consult Real Experts from the PlanMyWealth community with 5+ yrs
                of experience in Health Insurance. Zero spam. Zero charges.
              </p>
            </>
          )}
          <div className="w-full flex justify-center lg:justify-start">
            <h3 className="bg-green-500  text-white py-2 px-6 rounded-lg pb-6">
              CALL : +91 8307127643
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDF;
