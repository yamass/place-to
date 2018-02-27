export type ElementCorner = {
	x?: "left" | "center" | "right",
	y?: "top" | "center" | "bottom"
}

function isElementCorner(o: any): o is ElementCorner {
	return typeof o === "object";
}

interface Options {
}

function convertToElementCorner(corner: ElementCorner | string): ElementCorner {
	if (isElementCorner(corner)) {
		return corner;
	} else {
		const hasLeft: boolean = corner.indexOf("left") !== -1;
		const hasRight: boolean = corner.indexOf("right") !== -1;
		const hasTop: boolean = corner.indexOf("top") !== -1;
		const hasBottom: boolean = corner.indexOf("bottom") !== -1;
		const hasCenter: boolean = corner.indexOf("center") !== -1;
		return {
			x: hasLeft ? "left" : hasRight ? "right" : hasCenter ? "center" : undefined,
			y: hasTop ? "top" : hasBottom ? "bottom" : hasCenter ? "center" : undefined
		}
	}
}

export function place(element: HTMLElement, corner: ElementCorner | string): PlaceInvocation {
	return new PlaceInvocation(element, convertToElementCorner(corner));
}

let getCornerCoordinates = function (element: HTMLElement, corner: ElementCorner) {
	const boundingClientRect = element.getBoundingClientRect();
	let x: number | null;
	if (corner.x === 'left') {
		x = boundingClientRect.left;
	} else if (corner.x === 'right') {
		x = boundingClientRect.left + boundingClientRect.width;
	} else if (corner.x === 'center') {
		x = boundingClientRect.left + boundingClientRect.width / 2;
	} else {
		x = null;
	}
	let y: number | null;
	if (corner.y === 'top') {
		y = boundingClientRect.top;
	} else if (corner.y === 'bottom') {
		y = boundingClientRect.top + boundingClientRect.height;
	} else if (corner.y === 'center') {
		y = boundingClientRect.top + boundingClientRect.height / 2;
	} else {
		y = null;
	}
	return {x, y};
};

export class PlaceInvocation {
	private elementCorner: ElementCorner;

	constructor(private element: HTMLElement, elementCorner: ElementCorner) {
		this.elementCorner = elementCorner;
	}

	public to(otherElement: HTMLElement, otherElementCorner: ElementCorner | string): void {
		otherElementCorner = convertToElementCorner(otherElementCorner);

		if (this.elementCorner.x != null && otherElementCorner.x != null) {
			this.element.style.left = '0px';
			this.element.style.right = null;
		}
		if (this.elementCorner.y != null && otherElementCorner.y != null) {
			this.element.style.top = '0px';
			this.element.style.bottom = null;
		}

		let elementCornerPosition = getCornerCoordinates(this.element, this.elementCorner);
		let targetCornerPosition = getCornerCoordinates(otherElement, otherElementCorner);

		if (elementCornerPosition.x && targetCornerPosition.x) {
			this.element.style.left = (targetCornerPosition.x - elementCornerPosition.x) + 'px';
		}
		if (elementCornerPosition.y && targetCornerPosition.y) {
			this.element.style.top = (targetCornerPosition.y - elementCornerPosition.y) + 'px';
		}
	}
}