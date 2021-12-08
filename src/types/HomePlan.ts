// some of these are likely to be optional in which case numBeds?: ---- would suffice
export default interface HomePlan {
	homePlanId: number,
	name: string, 
	numBeds: number,
	numBaths: number,
	sqft: number,
	tags: string[],
	description: string,
	image: string,
}