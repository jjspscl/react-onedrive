import { usePicker } from "./picker.hook";
import { usePickerContext } from "../context/context";

interface PickerProps {
    iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Picker = (props: PickerProps) => {
    const { iframeProps, containerProps } = props;
    const ctx = usePickerContext();          
    

    usePicker(ctx);

    return (
        <div {...containerProps}>
            <iframe ref={ctx.ref} {...iframeProps}/>
        </div>
    );
};