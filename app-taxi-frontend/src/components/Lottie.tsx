import LottiePlayerLib, { LottieComponentProps } from 'lottie-react';
import { FC } from 'react';

interface ILottie extends LottieComponentProps {
  placeholder?: string;
}

export const Lottie: FC<ILottie> = ({ placeholder, ...rest }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <LottiePlayerLib {...rest} />
      {placeholder && (
        <p className="text-lg font-bold">
          {placeholder}
        </p>
      )}
    </div>
  );
};
