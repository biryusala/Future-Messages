import {Dispatch, FC, SetStateAction, useEffect} from "react";
import "./StepList.scss";
import { ReactComponent as CheckMark } from "../../../images/check-mark.svg";
import { ReactComponent as CrossMark } from "../../../images/cross-mark.svg";
import { ReactComponent as ArrowMark } from "../../../images/arrow.svg";
import {IStepList} from "../../../types/interfaces";

interface StepListProps {
  list: IStepList[];
  setStepsFinished: Dispatch<SetStateAction<boolean>>;
}

const StepList: FC<StepListProps> = ({list = [], setStepsFinished}) => {
  const currentOption = list.find((curr: IStepList) => !curr.validate())!;
  useEffect(() => {
    currentOption.isFinishState && setStepsFinished(true);
  }, [currentOption.isFinishState, setStepsFinished]);

  return (
    <div className={`steps ${currentOption.isFinishState ? 'steps--succeeded' : ''}`}>
      <div className={'steps-mark'}>
        {currentOption.isFinishState && <CheckMark fill={'#268800'}/>
          || currentOption.isError && <CrossMark fill={'#c90a0a'}/>
          || <ArrowMark fill={'#2196F3'}/>}
      </div>
      <span className={'steps-description'}>{currentOption.value}</span>
    </div>
  )
}

export default StepList;