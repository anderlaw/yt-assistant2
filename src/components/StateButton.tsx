import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
interface IProps {
  children?: string;
  loading: boolean;
  onBtnClick: () => void;
}
export default (props: IProps) => {
  return props.loading ? (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button type="button" onClick={props.onBtnClick}>
      {props.children || "确定"}
    </Button>
  );
};
