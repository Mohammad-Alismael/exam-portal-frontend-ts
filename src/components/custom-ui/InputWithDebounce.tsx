import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useDebounce from "../../lib/hooks/useDebounce";
import { cn } from "../../lib/utils";

function InputWithDebounce({
  val,
  setValue,
  customHook,
  label,
  defaultValue = "",
  objectKey,
}) {
  const debouncedVal = useDebounce(val, 500);

  const [exists, { isLoading }] = customHook();
  const [doesItExits, setDoesItExits] = useState(false);
  useEffect(() => {
    if (debouncedVal) {
      console.log(val);
      exists({ [objectKey]: val })
        .unwrap()
        .then((data) => {
          setDoesItExits(data["exists"]);
        });
    } else {
      setDoesItExits(false);
    }
  }, [debouncedVal]);
  return (
    <div className="">
      <Label htmlFor="email">{label}</Label>
      <Input
        disabled={isLoading}
        type="email"
        id={label}
        placeholder={label}
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue}
      />
      {defaultValue !== val && (
        <p
          className={cn(
            `text-sm text-muted-foreground ${
              doesItExits ? "text-red-400" : "text-green-400"
            } capitalize`
          )}
        >
          {doesItExits ? `${label} already taken` : `${label} available`}
        </p>
      )}
    </div>
  );
}

export default InputWithDebounce;
