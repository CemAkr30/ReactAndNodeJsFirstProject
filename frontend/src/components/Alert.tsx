import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ReactNode, useEffect, useState } from "react";

interface IAlert {
  message: string;
  backColor?: string;
  show: any;
  info?: ReactNode;
}

export default function Alert({ message, backColor, show, info }: IAlert) {
  const [status, setStatus] = useState<boolean>(false);

  console.log(info);

  useEffect(() => {
    setStatus(show);
    if (show) {
      const time = setTimeout(() => {
        setStatus(false);
      }, 4000);

      return () => {
        clearTimeout(time);
      };
    }
  }, [show]);

  return (
    <>
      {status && (
        <div
          className={`rounded-md bg-${backColor}-200 p-4 flex items-center justify-center`}
        >
          <div>
            <div className="flex justify-center">
              <CheckCircleIcon
                className={`h-5 w-5 text-${backColor}-400`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 text-center">
              <p className="text-sm font-medium text-black">{message}</p>
              {info && <p className="text-lg p-4 text-black">{info}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
