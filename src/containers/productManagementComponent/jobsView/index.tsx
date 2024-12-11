import React, { FC } from "react";

interface JobsViewProps {
  jobs: any[];
}

const JobsView: FC<JobsViewProps> = ({ jobs }) => {
  /**
   * JobsView
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
                className="px-2 py-[3px] rounded-lg  bg-white border border-grey-border flex items-center"
              >
                <span className="font-medium text-xs leading-4.5 text-grey-light-700">
                  {item.title}
                </span>
              </div>
            ))}
        </>
      )}

      {jobs?.length > 2 && (
        <div className="bg-utility-gray border border-grey-border px-2 py-[3px] rounded-full flex flex-row justify-center items-center gap-0.5">
          <span className="font-medium text-xs leading-3 text-grey-light-700">
            +{jobs?.length - 2}
          </span>
        </div>
      )}
    </div>
  );
};

export default JobsView;
