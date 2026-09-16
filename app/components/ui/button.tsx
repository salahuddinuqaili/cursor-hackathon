import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
	"group/button inline-flex min-h-touch shrink-0 items-center justify-center whitespace-nowrap rounded-none border border-transparent bg-clip-padding font-ui text-ui outline-none select-none compact:min-h-0 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 active:border-frame-ink active:bg-background active:text-foreground",
				outline:
					"border-frame-ink bg-background text-foreground hover:bg-muted active:bg-primary active:text-primary-foreground",
				secondary:
					"border-frame-ink bg-secondary text-secondary-foreground hover:bg-muted active:bg-primary active:text-primary-foreground",
				ghost:
					"hover:bg-muted active:bg-primary active:text-primary-foreground",
				destructive:
					"border-destructive bg-destructive text-primary-foreground hover:bg-destructive/90",
				link: "min-h-0 text-link underline underline-offset-4",
			},
			size: {
				default:
					"h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				xs: "h-7 gap-1 px-2",
				sm: "h-8 gap-1 px-3",
				lg: "h-11 gap-2 px-5",
				icon: "size-9",
				"icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
				"icon-lg": "size-11",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
