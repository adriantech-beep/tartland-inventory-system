import { Label } from "@radix-ui/react-label";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PopoverComponent = () => {
  return (
    <Popover>
      {/* <PopoverTrigger asChild></PopoverTrigger> */}

      <PopoverContent
        align="start"
        className="w-80 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"
      >
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Quick Profile Edit
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your display info below.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-300"
              >
                Name
              </Label>
              <Input
                id="name"
                // defaultValue={name || ""}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                id="email"
                // defaultValue={email || ""}
                className="col-span-2 h-8"
              />
            </div>
            <Button
              size="sm"
              className="mt-2 bg-primary text-white hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverComponent;
