	.file	"prog.c"
	.text
	.p2align 4,,15
	.globl	bubble_sort
	.type	bubble_sort, @function
bubble_sort:

#Basic Block
.LFB20:
	addq 	$2,insn_count
	.cfi_startproc
	testl	%esi, %esi
	jle	.L1

#Basic Block
	addq 	$4,insn_count 
	leal	-2(%rsi), %eax
	cmpl	$1, %esi
	leaq	4(%rdi,%rax,4), %r8
	jne	.L17


#Basic Block
.L1:
	rep ret

#Basic Block
.L17:
	addq 	$1,insn_count 
	xorl	%r10d, %r10d
	.p2align 4,,10
	.p2align 3

#Basic Block
.L4:
	addq 	$2,insn_count 
	movq	%rdi, %rax
	xorl	%r9d, %r9d
	.p2align 4,,10
	.p2align 3

#Basic Block
.L8:
	addq 	$4,insn_count 
	movl	(%rax), %ecx
	movl	4(%rax), %edx
	cmpl	%edx, %ecx
	jle	.L5

#Basic Block
	addq 	$3,insn_count 
	movl	%ecx, 4(%rax)
	movl	%edx, (%rax)
	movl	$1, %r9d

#Basic Block
.L5:
	addq 	$3,insn_count 
	addq	$4, %rax
	cmpq	%r8, %rax
	jne	.L8

#Basic Block
	addq 	$2,insn_count 
	testl	%r9d, %r9d
	je	.L1

#Basic Block
	addq 	$3,insn_count 
	addl	$1, %r10d
	cmpl	%esi, %r10d
	jne	.L4

#Basic Block
	rep ret
	.cfi_endproc

#Basic Block
.LFE20:
	.size	bubble_sort, .-bubble_sort
	.p2align 4,,15
	.globl	check_sorted
	.type	check_sorted, @function
check_sorted:

#Basic Block
.LFB21:
	addq 	$2,insn_count 
	.cfi_startproc
	cmpl	$1, %esi
	jle	.L22

#Basic Block
	addq 	$3,insn_count 
	movl	4(%rdi), %eax
	cmpl	%eax, (%rdi)
	jg	.L24

#Basic Block
	addq 	$4,insn_count 
	leal	-2(%rsi), %eax
	addq	$4, %rdi
	leaq	(%rdi,%rax,4), %rdx
	jmp	.L20

#Basic Block
	.p2align 4,,10
	.p2align 3

#Basic Block
.L21:
	addq 	$4,insn_count 
	movl	(%rdi), %eax
	addq	$4, %rdi
	cmpl	(%rdi), %eax
	jg	.L24

#Basic Block
.L20:
	addq 	$2,insn_count 
	cmpq	%rdx, %rdi
	jne	.L21

#Basic Block
.L22:
	addq 	$2,insn_count 
	movl	$1, %eax
	ret
	.p2align 4,,10
	.p2align 3

#Basic Block
.L24:
	addq 	$2,insn_count 
	xorl	%eax, %eax
	ret
	.cfi_endproc

#Basic Block
.LFE21:
	.size	check_sorted, .-check_sorted
	.section	.rodata.str1.8,"aMS",@progbits,1
	.align 8

#Basic Block
.LC0:
	.string	"%lld instructions are executed\n"
	.section	.rodata.str1.1,"aMS",@progbits,1

#Basic Block
.LC1:
	.string	"numbers are sorted"

#Basic Block
.LC2:
	.string	"numbers are not sorted"
	.section	.text.startup,"ax",@progbits
	.p2align 4,,15
	.globl	main
	.type	main, @function
main:

#Basic Block
.LFB22:
	addq 	$3,insn_count 
	.cfi_startproc
	addq	$1, insn_count(%rip)
	pushq	%rbx
	.cfi_def_cfa_offset 16
	.cfi_offset 3, -16
	movl	$numbers, %ebx
	.p2align 4,,10
	.p2align 3

#Basic Block
.L27:
	addq 	$5,insn_count 
	call	rand
	addq	$4, %rbx
	movl	%eax, -4(%rbx)
	cmpq	$numbers+40000, %rbx
	jne	.L27

#Basic Block
	addq 	$7,insn_count 
	movl	$10000, %esi
	movl	$numbers, %edi
	call	bubble_sort
	addq	$1, insn_count(%rip)
	movl	$numbers+4, %eax
	movl	numbers(%rip), %ecx
	jmp	.L30
	.p2align 4,,10
	.p2align 3

#Basic BLock
.L33:
	addq 	$3,insn_count 
	addq	$4, %rax
	cmpq	$numbers+40000, %rax
	je	.L29

#Basic Block
	addq 	$1,insn_count 
	movl	%edx, %ecx

#Basic Block
.L30:
	addq 	$3,insn_count 
	movl	(%rax), %edx
	cmpl	%ecx, %edx
	jge	.L33

#Basic Block
	addq 	$2,insn_count 
	movl	$.LC2, %edi
	call	puts

#Basic Block
.L31:
	addq 	$6,insn_count 
	movq	insn_count(%rip), %rsi
	movl	$.LC0, %edi
	xorl	%eax, %eax
	call	printf
	xorl	%edi, %edi
	call	exit

#Basic Block
.L29:
	addq 	$3,insn_count
	movl	$.LC1, %edi
	call	puts
	jmp	.L31
	.cfi_endproc

#Basic Block
.LFE22:
	.size	main, .-main
	.comm	numbers,40000,32
	.globl	insn_count
	.bss
	.align 16
	.type	insn_count, @object
	.size	insn_count, 8
insn_count:
	.zero	8
	.ident	"GCC: (GNU) 4.8.5 20150623 (Red Hat 4.8.5-11)"
	.section	.note.GNU-stack,"",@progbits
