	.file	"add-adcl.c"
	.text
	.p2align 4,,15
	.globl	add
	.type	add, @function
add:
.LFB0:   #JOSHUA RAO - I WAS ONLY ABLE TO DISPLAY THE LAST 8 BITS OF EACH FIBONACCI NUMBER. 
		#THESE NUMBERS ARE CORRECT. I JUST COULD NOT GET THEM DISPLAYED CORRECTLY. 
	.cfi_startproc
	movl	(%rsi), %eax
	movl	$1, %ecx
	movl	%eax, %r8d
	addl	(%rdi), %r8d
	
.L2:
	movl	%r8d, (%rdx) 
	movl	4(%rdi), %r8d #a[1]
	movl	4(%rsi), %r9d #b[1]
	addl	%r8d, %r9d #add a[1]+b[1] and puts into %r9d
	movl	%r9d, %ecx #moves %r9d into %ecx AND REPEATS FOR NEXT LABELS

.L3:
	movl	%ecx, 4(%rdx) 
	movl	8(%rdi), %r8d 
	movl	8(%rsi), %r9d
	addl	%r8d, %r9d
	movl	%r9d, %eax
	
.L4:
	movl	%eax, 8(%rdx)
	movl	12(%rdi), %r8d
	movl	12(%rsi), %r9d
	addl	%r8d, %r9d
	movl	%r9d, %ecx
.L5:
	movl	%ecx, 12(%rdx)
	movl	16(%rdi), %r8d
	movl	16(%rsi), %r9d
	addl	%r8d, %r9d
	movl	%r9d, %eax
.L6:
	movl	%eax, 16(%rdx)
	movl	20(%rdi), %r8d
	movl	20(%rsi), %r9d
	addl	%r8d, %r9d
	movl	%r9d, %ecx
.L7:
	movl	%ecx, 20(%rdx)
	movl	24(%rdi), %r8d
	movl	24(%rsi), %r9d
	
	addl	%r8d, %r9d
	movl	%r9d, %eax
.L8:
	movl	%eax, 24(%rdx)
	movl	28(%rdi), %r8d
	movl	28(%rsi), %r9d
	addl	%r8d, %r9d
	movl	%r9d, %ecx
.L9:
	movl	%ecx, 28(%rdx)
	movl	32(%rdi), %r8d
	movl	32(%rsi), %r9d
	addl    %r8d, %r9d
	movl    %r9d, %eax
	
.L10:
	movl	%eax, 32(%rdx)
	movl	36(%rdi), %r8d
	movl	36(%rsi), %r9d
	addl    %r8d, %r9d
	movl	%r9d, %ecx
	
.L11:
	movl	%ecx, 36(%rdx)
	xorl    %eax, %eax #SETS EAX TO ZERO
	adcl    %eax, %eax #ADDS THE CARRY FLAG TO %EAX 
	ret
	.cfi_endproc
.LFE0:
	.size	add, .-add
	.ident	"GCC: (GNU) 4.8.5 20150623 (Red Hat 4.8.5-11)"
	.section	.note.GNU-stack,"",@progbits