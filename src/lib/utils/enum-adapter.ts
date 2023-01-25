import { session_cube_enum } from '@prisma/client'

export const getCube = (input: session_cube_enum) => {
	switch (input) {
		case session_cube_enum.n2x2:
			return '222'
		case session_cube_enum.n3x3:
			return '333'
		case session_cube_enum.n4x4:
			return '444'
		case session_cube_enum.n5x5:
			return '555'
		case session_cube_enum.n6x6:
			return '666'
		case session_cube_enum.n7x7:
			return '777'
		case session_cube_enum.megaminx:
			return 'minx'
		case session_cube_enum.pyraminx:
			return 'pyram'
		case session_cube_enum.clock:
			return 'clock'
		case session_cube_enum.sq1:
			return 'sq1'
		case session_cube_enum.bld3:
			return '333bf'
		case session_cube_enum.bld4:
			return '444bf'
		case session_cube_enum.bld5:
			return '555bf'
	}
}
