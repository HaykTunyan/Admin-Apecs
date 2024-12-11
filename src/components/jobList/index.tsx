import React, { FC } from "react";

interface JobsListProps {
  jobs: any[];
}

const JobsList: FC<JobsListProps> = ({ jobs }) => {
  /**
   * JobsList
   *
   */

  return (
    <div className="flex flex-row gap-1">
      {jobs?.length > 0 && (
        <>
          {jobs
            .slice(0, 2)
            .map((item: any, index: React.Key | null | undefined) => (
              <div
                key={index}
                className="px-2 py-0.5 rounded-full  bg-utility-gray border border-utility-gray-200"
              >
                <span className="font-medium text-xs leading-4.5 text-grey-light-700 ">
                  {item.title}
                </span>
              </div>
            ))}
        </>
      )}

      {jobs?.length > 2 && (
        <div className="bg-utility-gray border border-utility-gray-200 px-2 py-0.5 rounded-full flex flex-row justify-center items-center gap-0.5">
          <span className="font-medium text-xs leading-3 text-utility-gray-700">
            +{jobs?.length - 2}
          </span>
        </div>
      )}
    </div>
  );
};

export default JobsList;
