export interface Metadata {
	map: string;
	game_version: string;
	game_length: number;
	game_start: number;
	game_start_patched: string;
	rounds_played: number;
	mode: string;
	queue: string;
	season_id: string;
	platform: string;
	matchid: string;
	region: string;
	cluster: string;
}

export interface SessionPlaytime {
	minutes: number;
	seconds?: number;
	milliseconds?: number;
}

export interface FriendlyFire {
	incoming: number;
	outgoing: number;
}

export interface Behavior {
	afk_rounds: number;
	friendly_fire: FriendlyFire;
	rounds_in_spawn: number;
}

export interface Os {
	name: string;
	version: string;
}

export interface Platform {
	type: string;
	os: Os;
}

export interface AbilityCasts {
	c_cast: number;
	q_cast: number;
	e_cast: number;
	x_cast: number;
}

export interface Card {
	small: string;
	large: string;
	wide: string;
}

export interface Agent {
	small: string;
	bust: string;
	full: string;
	killfeed: string;
}

export interface Assets {
	card: Card;
	agent: Agent;
}

export interface Stats {
	score: number;
	kills: number;
	deaths: number;
	assists: number;
	bodyshots: number;
	headshots: number;
	legshots: number;
}

export interface Spent {
	overall: number;
	average: number;
}

export interface LoadoutValue {
	overall: number;
	average: number;
}

export interface Economy {
	spent: Spent;
	loadout_value: LoadoutValue;
}

export interface AllPlayer {
	puuid: string;
	name: string;
	tag: string;
	team: string;
	level: number;
	character: string;
	currenttier: number;
	currenttier_patched: string;
	player_card: string;
	player_title: string;
	party_id: string;
	session_playtime: SessionPlaytime;
	behavior: Behavior;
	platform: Platform;
	ability_casts: AbilityCasts;
	assets: Assets;
	stats: Stats;
	economy: Economy;
	damage_made: number;
	damage_received: number;
}

export interface SessionPlaytime2 {
	minutes: number;
	seconds: number;
	milliseconds: number;
}

export interface FriendlyFire2 {
	incoming: number;
	outgoing: number;
}

export interface Behavior2 {
	afk_rounds: number;
	friendly_fire: FriendlyFire2;
	rounds_in_spawn: number;
}

export interface Os2 {
	name: string;
	version: string;
}

export interface Platform2 {
	type: string;
	os: Os2;
}

export interface AbilityCasts2 {
	c_cast: number;
	q_cast: number;
	e_cast: number;
	x_cast: number;
}

export interface Card2 {
	small: string;
	large: string;
	wide: string;
}

export interface Agent2 {
	small: string;
	bust: string;
	full: string;
	killfeed: string;
}

export interface Assets2 {
	card: Card2;
	agent: Agent2;
}

export interface Stats2 {
	score: number;
	kills: number;
	deaths: number;
	assists: number;
	bodyshots: number;
	headshots: number;
	legshots: number;
}

export interface Spent2 {
	overall: number;
	average: number;
}

export interface LoadoutValue2 {
	overall: number;
	average: number;
}

export interface Economy2 {
	spent: Spent2;
	loadout_value: LoadoutValue2;
}

export interface Red {
	puuid: string;
	name: string;
	tag: string;
	team: string;
	level: number;
	character: string;
	currenttier: number;
	currenttier_patched: string;
	player_card: string;
	player_title: string;
	party_id: string;
	session_playtime: SessionPlaytime2;
	behavior: Behavior2;
	platform: Platform2;
	ability_casts: AbilityCasts2;
	assets: Assets2;
	stats: Stats2;
	economy: Economy2;
	damage_made: number;
	damage_received: number;
}

export interface SessionPlaytime3 {
	minutes: number;
	seconds?: number;
	milliseconds?: number;
}

export interface FriendlyFire3 {
	incoming: number;
	outgoing: number;
}

export interface Behavior3 {
	afk_rounds: number;
	friendly_fire: FriendlyFire3;
	rounds_in_spawn: number;
}

export interface Os3 {
	name: string;
	version: string;
}

export interface Platform3 {
	type: string;
	os: Os3;
}

export interface AbilityCasts3 {
	c_cast: number;
	q_cast: number;
	e_cast: number;
	x_cast: number;
}

export interface Card3 {
	small: string;
	large: string;
	wide: string;
}

export interface Agent3 {
	small: string;
	bust: string;
	full: string;
	killfeed: string;
}

export interface Assets3 {
	card: Card3;
	agent: Agent3;
}

export interface Stats3 {
	score: number;
	kills: number;
	deaths: number;
	assists: number;
	bodyshots: number;
	headshots: number;
	legshots: number;
}

export interface Spent3 {
	overall: number;
	average: number;
}

export interface LoadoutValue3 {
	overall: number;
	average: number;
}

export interface Economy3 {
	spent: Spent3;
	loadout_value: LoadoutValue3;
}

export interface Blue {
	puuid: string;
	name: string;
	tag: string;
	team: string;
	level: number;
	character: string;
	currenttier: number;
	currenttier_patched: string;
	player_card: string;
	player_title: string;
	party_id: string;
	session_playtime: SessionPlaytime3;
	behavior: Behavior3;
	platform: Platform3;
	ability_casts: AbilityCasts3;
	assets: Assets3;
	stats: Stats3;
	economy: Economy3;
	damage_made: number;
	damage_received: number;
}

export interface Players {
	all_players: AllPlayer[];
	red: Red[];
	blue: Blue[];
}

export interface Red2 {
	has_won: boolean;
	rounds_won: number;
	rounds_lost: number;
}

export interface Blue2 {
	has_won: boolean;
	rounds_won: number;
	rounds_lost: number;
}

export interface Teams {
	red: Red2;
	blue: Blue2;
}

export interface PlantLocation {
	x: number;
	y: number;
}

export interface PlantedBy {
	puuid: string;
	display_name: string;
	team: string;
}

export interface Location {
	x: number;
	y: number;
}

export interface PlayerLocationsOnPlant {
	player_puuid: string;
	player_display_name: string;
	player_team: string;
	location: Location;
	view_radians: number;
}

export interface PlantEvents {
	plant_location: PlantLocation;
	planted_by: PlantedBy;
	plant_site: string;
	plant_time_in_round?: number;
	player_locations_on_plant: PlayerLocationsOnPlant[];
}

export interface DefuseLocation {
	x: number;
	y: number;
}

export interface DefusedBy {
	puuid: string;
	display_name: string;
	team: string;
}

export interface Location2 {
	x: number;
	y: number;
}

export interface PlayerLocationsOnDefuse {
	player_puuid: string;
	player_display_name: string;
	player_team: string;
	location: Location2;
	view_radians: number;
}

export interface DefuseEvents {
	defuse_location: DefuseLocation;
	defused_by: DefusedBy;
	defuse_time_in_round?: number;
	player_locations_on_defuse: PlayerLocationsOnDefuse[];
}

export interface AbilityCasts4 {
	c_casts?: any;
	q_casts?: any;
	e_cast?: any;
	x_cast?: any;
}

export interface DamageEvent {
	receiver_puuid: string;
	receiver_display_name: string;
	receiver_team: string;
	bodyshots: number;
	damage: number;
	headshots: number;
	legshots: number;
}

export interface VictimDeathLocation {
	x: number;
	y: number;
}

export interface DamageWeaponAssets {
	display_icon: string;
	killfeed_icon: string;
}

export interface Location3 {
	x: number;
	y: number;
}

export interface PlayerLocationsOnKill {
	player_puuid: string;
	player_display_name: string;
	player_team: string;
	location: Location3;
	view_radians: number;
}

export interface Assistant {
	assistant_puuid: string;
	assistant_display_name: string;
	assistant_team: string;
}

export interface KillEvent {
	kill_time_in_round: number;
	kill_time_in_match: number;
	killer_puuid: string;
	killer_display_name: string;
	killer_team: string;
	victim_puuid: string;
	victim_display_name: string;
	victim_team: string;
	victim_death_location: VictimDeathLocation;
	damage_weapon_id: string;
	damage_weapon_name: string;
	damage_weapon_assets: DamageWeaponAssets;
	secondary_fire_mode: boolean;
	player_locations_on_kill: PlayerLocationsOnKill[];
	assistants: Assistant[];
}

export interface Assets4 {
	display_icon: string;
	killfeed_icon: string;
}

export interface Weapon {
	id: string;
	name: string;
	assets: Assets4;
}

export interface Assets5 {
	display_icon: string;
}

export interface Armor {
	id: string;
	name: string;
	assets: Assets5;
}

export interface Economy4 {
	loadout_value: number;
	weapon: Weapon;
	armor: Armor;
	remaining: number;
	spent: number;
}

export interface PlayerStat {
	ability_casts: AbilityCasts4;
	player_puuid: string;
	player_display_name: string;
	player_team: string;
	damage_events: DamageEvent[];
	damage: number;
	bodyshots: number;
	headshots: number;
	legshots: number;
	kill_events: KillEvent[];
	kills: number;
	score: number;
	economy: Economy4;
	was_afk: boolean;
	was_penalized: boolean;
	stayed_in_spawn: boolean;
}

export interface Round {
	winning_team: string;
	end_type: string;
	bomb_planted: boolean;
	bomb_defused: boolean;
	plant_events: PlantEvents;
	defuse_events: DefuseEvents;
	player_stats: PlayerStat[];
}

export interface VictimDeathLocation2 {
	x: number;
	y: number;
}

export interface DamageWeaponAssets2 {
	display_icon: string;
	killfeed_icon: string;
}

export interface Location4 {
	x: number;
	y: number;
}

export interface PlayerLocationsOnKill2 {
	player_puuid: string;
	player_display_name: string;
	player_team: string;
	location: Location4;
	view_radians: number;
}

export interface Assistant2 {
	assistant_puuid: string;
	assistant_display_name: string;
	assistant_team: string;
}

export interface Kill {
	kill_time_in_round: number;
	kill_time_in_match: number;
	round: number;
	killer_puuid: string;
	killer_display_name: string;
	killer_team: string;
	victim_puuid: string;
	victim_display_name: string;
	victim_team: string;
	victim_death_location: VictimDeathLocation2;
	damage_weapon_id: string;
	damage_weapon_name: string;
	damage_weapon_assets: DamageWeaponAssets2;
	secondary_fire_mode: boolean;
	player_locations_on_kill: PlayerLocationsOnKill2[];
	assistants: Assistant2[];
}

export interface HistoryData {
	metadata: Metadata ;
	players: Players ;
	teams: Teams ;
	rounds: Round[] ;
	kills: Kill[] ;
}

export interface HistoryResponse<T> {
	status: number;
	data: T[];
}