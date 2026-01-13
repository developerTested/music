import React, { useEffect, useRef, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utilities/helper"
import { Input } from "./Input"
import { CiSearch } from "react-icons/ci"
import Alert from "../Alert"
import { MUSIC_API } from "@/utilities/api"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const selectStyles = cva("relative flex items-center gap-2 rounded ", {
    variants: {
        variant: {
            default: ""
        },
        disabled: {
            false: null,
            true: ["opacity-50", "cursor-not-allowed"],
        },
    },
    defaultVariants: {
        variant: "default",
        disabled: false,
    }
})


export type SelectedItemType = { _id: string }

export type OptionBase = SelectedItemType & {
    name?: string;
    title?: string;
    [key: string]: string | number | boolean | undefined;
};

type cloneElementType = React.ComponentProps<"div"> | React.ComponentProps<"option">;

type SelectProps<T extends OptionBase = OptionBase> =
    VariantProps<typeof selectStyles> &
    React.ComponentProps<"div"> & {
        placeholderText?: string;
        url: string;
        options?: T[];
        renderItem?: (item: T,) => React.ReactElement;
        placeholder?: string;
        value: string,
        onSelect: (item: T) => void;
    };

export function Select({
    value,
    onSelect,
    variant,
    className,
    placeholderText = "Select",
    url,
    options,
    renderItem,
}: SelectProps) {

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<OptionBase | null>(null)
    const [optionsData, setOptionsData] = useState<OptionBase[]>(options || []);
    const [searchInput, setSearchInput] = useState("");
    const [open, setOpen] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setOpen(prev => !prev);
        setSearchInput("");
    };

    const handleChange = (item: OptionBase) => {
        onSelect(item); // Notify parent (React Hook Form)
        setOpen(false);   // Close dropdown after selection
        setSearchInput(""); // Clear search
        setSelected(item);
    };

    useEffect(() => {
        if (!value || !optionsData.length) return;

        const genreArr = Array.isArray(value) ? value.map((v) => v._id) : [value];

        const found = optionsData.find(opt => genreArr.includes(opt._id));
        if (found) {
            setSelected(found);
        }

        console.log(value, genreArr, found);


    }, [value, optionsData]);

    useEffect(() => {
        if (!url) return;


        const fetchData = async () => {
            setLoading(true);

            try {
                const { data: response } = await MUSIC_API.get(url);
                setOptionsData(response.data);
            } catch (error) {
                console.error("Error while fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            setOptionsData([]);
        };
    }, [url]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
                setSearchInput("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = optionsData.length ? optionsData.filter(option => {
        const label = option?.name ?? option?.title ?? "";
        return label.toLowerCase().includes(searchInput.toLowerCase());
    }) : [];

    const selectedLabel = selected ? selected?.name ?? selected?.title : placeholderText;

    return (
        <div
            ref={selectRef}
            className={cn("", className, selectStyles({ variant }))}
        >
            <div
                onClick={toggleOpen}
                className="px-4 py-2 w-full border dark:border-zinc-800 flex items-center justify-between"
            >
                <span>{selectedLabel}</span>
                <div className="transition-all">
                    {open ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>

            <div
                className={cn(
                    "flex flex-col",
                    "absolute top-full left-0 right-0 z-10",
                    "animate-in fade-in zoom-in-95",
                    "mt-2",
                    "bg-white dark:bg-zinc-700",
                    open ? "flex" : "hidden"
                )}
            >
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={placeholderText}
                    startIcon={<CiSearch className="size-6" />}
                    className="rounded-none"
                />
                <div className="select-content h-auto max-h-60 overflow-y-auto">
                    {filteredOptions.length > 0 ? (
                        <div className="flex flex-col">
                            {loading ? (
                                <div className="p-4 text-sm text-gray-500">Loading...</div>
                            ) : filteredOptions.map((opt) => (
                                <div key={opt._id} className="select-option">
                                    {renderItem ? (() => {
                                        const item = renderItem(opt);
                                        if (React.isValidElement(item)) {
                                            const element = item as React.ReactElement<cloneElementType>;
                                            return React.cloneElement(element, {
                                                ...element.props,
                                                onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent> & React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
                                                    element.props.onClick?.(e);
                                                    handleChange(opt);
                                                },
                                                className: cn("select-item", element.props.className),
                                            });
                                        }
                                        return null;
                                    })() : (
                                        <SelectItem
                                            active={value === opt._id}
                                            item={opt}
                                            onSelect={() => handleChange(opt)}
                                            className="px-4 py-2"
                                        >
                                            {opt.name ?? opt.title}
                                        </SelectItem>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Alert message="No matching options found." />
                    )}
                </div>
            </div>
        </div>
    );
}


type SelectItemProps<T> = React.ComponentProps<"div"> & {
    item: T;
    onSelect: (item: T) => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    active?: boolean;
};

export const SelectItem = <T,>({
    item,
    onSelect,
    className,
    children,
    startIcon,
    endIcon,
    active,

    ...rest
}: SelectItemProps<T>) => {
    return (
        <div
            {...rest}
            onClick={() => onSelect(item)}
            role="option"
            tabIndex={0}
            className={cn(
                "text-sm outline-none select-none",
                "relative flex items-center gap-2 px-2 py-1.5",
                "focus:bg-inherit focus:text-inherit",
                "cursor-pointer",
                "bg-white hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white hover:text-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:text-zinc-200",
                active ? "bg-zinc-800 text-white" : "",
                className
            )}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    (e.currentTarget as HTMLElement).click();
                }
            }}
        >
            {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
            {children}
            {endIcon && <span className="ml-auto flex-shrink-0">{endIcon}</span>}
        </div>
    );
};